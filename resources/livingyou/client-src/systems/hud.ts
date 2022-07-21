import * as alt from 'alt-client';
import * as native from 'natives';
import { WebViewController } from '../extensions/webViewController';
import ScreenFade from '../utility/screenFade';
import { OnServer } from './eventSystem/on';

let isDisabled: boolean = false;
let hasRegistered: boolean = false;
let vehicleTick: number = 0;

export default class HUD {
    static async open(): Promise<void> {
        if (!hasRegistered) {
            WebViewController.registerOverlay('HUD', HUD.setVisible);
            hasRegistered = true;
        }

        const view: alt.WebView = await WebViewController.get();
        view.on(`hudReady`, HUD.ready);

        await WebViewController.openPages(['HUD']);
    }

    @OnServer('player:Spawned')
    static async playerSpawned(): Promise<void> {
        native.displayHud(true);
        alt.toggleGameControls(true);
        await ScreenFade.fadeIn(0);
        await HUD.open();
    }

    static async setVisible(value: boolean): Promise<void> {
        isDisabled = !value;

        if (!isDisabled) {
            native.displayHud(true);
            HUD.open();
            return;
        }

        await WebViewController.closePages(['HUD']);

        const view: alt.WebView = await WebViewController.get();
        view.off(`hudReady`, HUD.ready);
        native.displayHud(false);
    }

    static async ready(): Promise<void> {
        const view: alt.WebView = await WebViewController.get();
        if (alt.Player.local.vehicle) {
            HUD.showDriveHud();
        } else {
            HUD.hideDriveHud();
            view.emit('updateVehicleData', 0, 0);
        }
    }

    @OnServer('hud:ShowDriveHud')
    static async showDriveHud(): Promise<void> {
        if (isDisabled) return;
        const view: alt.WebView = await WebViewController.get();
        native.displayRadar(true);
        view.emit('openVehicleHud');
        vehicleTick = alt.everyTick(() => {
            if (!alt.Player.local.vehicle) return;
            view.emit(
                'updateVehicleData',
                alt.Player.local.vehicle.engineOn ? alt.Player.local.vehicle.rpm : 0,
                (alt.Player.local.vehicle.speed * 3.6).toFixed(0)
            );
        });
    }

    @OnServer('hud:HideDriveHud')
    static async hideDriveHud(): Promise<void> {
        if (isDisabled) return;
        const view: alt.WebView = await WebViewController.get();
        native.displayRadar(false);
        view.emit('closeVehicleHud');
        if (vehicleTick === 0) return;
        alt.clearEveryTick(vehicleTick);
        vehicleTick = 0;
    }
}
