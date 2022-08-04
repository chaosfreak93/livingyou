import * as alt from 'alt-client';
import * as native from 'natives';
import { WebViewEvents } from '../../shared/enums/WebViewEvents';
import { WebViewController } from '../extensions/webViewController';
import ScreenFade from '../utility/screenFade';
import { On, OnServer } from './eventSystem/on';

let isDisabled = false;
let hasRegistered = false;
let vehicleTick = 0;

export default class HUD {
    static async open() {
        if (!hasRegistered) {
            WebViewController.registerOverlay('HUD', HUD.setVisible);
            hasRegistered = true;
        }

        const view = await WebViewController.get();
        view.on(WebViewEvents.HUD_READY, HUD.ready);

        await WebViewController.openPages(['HUD']);
    }

    @OnServer('player:Spawned')
    static async playerSpawned() {
        native.displayHud(true);
        alt.toggleGameControls(true);
        await ScreenFade.fadeIn(0);
        await HUD.open();
    }

    static async setVisible(value: boolean) {
        isDisabled = !value;

        if (!isDisabled) {
            native.displayHud(true);
            HUD.open();
            return;
        }

        await WebViewController.closePages(['HUD']);

        const view = await WebViewController.get();
        view.off(WebViewEvents.HUD_READY, HUD.ready);
        native.displayHud(false);
    }

    static async ready() {
        const view = await WebViewController.get();
        if (alt.Player.local.vehicle) {
            HUD.showDriveHud();
        } else {
            HUD.hideDriveHud();
            view.emit(WebViewEvents.HUD_UPDATE_VEHICLE_DATA, 0, 0);
        }
    }

    @On('enteredVehicle')
    static async showDriveHud() {
        if (isDisabled) return;
        const view = await WebViewController.get();
        native.displayRadar(true);
        view.emit(WebViewEvents.HUD_OPEN_VEHICLE_HUD);
        vehicleTick = alt.everyTick(() => {
            if (!alt.Player.local.vehicle) return;
            view.emit(
                WebViewEvents.HUD_UPDATE_VEHICLE_DATA,
                alt.Player.local.vehicle.rpm,
                (native.getEntitySpeed(alt.Player.local.vehicle) * 3.6).toFixed(0)
            );
        });
    }

    @On('leftVehicle')
    static async hideDriveHud() {
        if (isDisabled) return;
        const view = await WebViewController.get();
        native.displayRadar(false);
        view.emit(WebViewEvents.HUD_CLOSE_VEHICLE_HUD);
        if (!vehicleTick) return;
        alt.clearEveryTick(vehicleTick);
    }
}
