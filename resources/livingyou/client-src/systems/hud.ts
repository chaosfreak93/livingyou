import * as alt from 'alt-client';
import * as native from 'natives';
import IGasPump from '../../shared/interface/IGasPump';
import { WebViewEvents } from '../../shared/enums/WebViewEvents';
import { WebViewController } from '../extensions/webViewController';
import ScreenFade from '../utility/screenFade';
import { EmitServer } from './eventSystem/emit';
import { OnServer } from './eventSystem/on';

export default class HUD {
    static isDisabled: boolean = false;
    static hasRegistered: boolean = false;
    static vehicleTick: number = 0;
    static cameraControlTick: number = 0;

    static async open(): Promise<void> {
        if (!HUD.hasRegistered) {
            WebViewController.registerOverlay('HUD', HUD.setVisible);
            HUD.hasRegistered = true;
        }

        const view: alt.WebView = await WebViewController.get();
        view.on(WebViewEvents.HUD_READY, HUD.ready);
        view.on(WebViewEvents.HUD_PROCEED_ACTION, HUD.proceedAction);

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
        HUD.isDisabled = !value;

        if (!HUD.isDisabled) {
            native.displayHud(true);
            HUD.open();
            return;
        }

        await WebViewController.closePages(['HUD']);

        const view: alt.WebView = await WebViewController.get();
        view.off(WebViewEvents.HUD_READY, HUD.ready);
        view.off(WebViewEvents.HUD_PROCEED_ACTION, HUD.proceedAction);
        native.displayHud(false);
    }

    static async ready(): Promise<void> {
        const view: alt.WebView = await WebViewController.get();
        if (alt.Player.local.vehicle) {
            HUD.showDriveHud();
        } else {
            HUD.hideDriveHud();
            view.emit(WebViewEvents.HUD_UPDATE_VEHICLE_DATA, 0, 0);
        }
    }

    @OnServer('hud:ShowDriveHud')
    static async showDriveHud(): Promise<void> {
        if (HUD.isDisabled) return;
        const view: alt.WebView = await WebViewController.get();
        native.displayRadar(true);
        view.emit(WebViewEvents.HUD_OPEN_VEHICLE_HUD);
        HUD.vehicleTick = alt.everyTick(() => {
            if (!alt.Player.local.vehicle) return;
            view.emit(
                WebViewEvents.HUD_UPDATE_VEHICLE_DATA,
                alt.Player.local.vehicle.engineOn ? alt.Player.local.vehicle.rpm : 0,
                (native.getEntitySpeed(alt.Player.local.vehicle) * 3.6).toFixed(0)
            );
        });
    }

    @OnServer('hud:HideDriveHud')
    static async hideDriveHud(): Promise<void> {
        if (HUD.isDisabled) return;
        const view: alt.WebView = await WebViewController.get();
        native.displayRadar(false);
        view.emit(WebViewEvents.HUD_CLOSE_VEHICLE_HUD);
        if (HUD.vehicleTick === 0) return;
        alt.clearEveryTick(HUD.vehicleTick);
        HUD.vehicleTick = 0;
    }

    @OnServer('actionMenu:OpenInVehicleActions')
    static async openInVehicleActions(vehicleId: number): Promise<void> {
        if (HUD.isDisabled) return;
        const view: alt.WebView = await WebViewController.get();
        WebViewController.showCursor(true);
        HUD.cameraControlTick = alt.everyTick(() => {
            native.disableControlAction(1, 1, true);
            native.disableControlAction(1, 2, true);
            native.disableControlAction(1, 3, true);
            native.disableControlAction(1, 4, true);
            native.disableControlAction(1, 5, true);
            native.disableControlAction(1, 6, true);
        });
        view.emit(WebViewEvents.HUD_OPEN_IN_VEHICLE_ACTIONS, vehicleId);
        view.focus();
    }

    @OnServer('actionMenu:OpenVehicleActions')
    static async openVehicleActions(vehicleId: number, gasPump?: IGasPump): Promise<void> {
        if (HUD.isDisabled) return;
        const view: alt.WebView = await WebViewController.get();
        WebViewController.showCursor(true);
        HUD.cameraControlTick = alt.everyTick(() => {
            native.disableControlAction(1, 1, true);
            native.disableControlAction(1, 2, true);
            native.disableControlAction(1, 3, true);
            native.disableControlAction(1, 4, true);
            native.disableControlAction(1, 5, true);
            native.disableControlAction(1, 6, true);
        });
        view.emit(WebViewEvents.HUD_OPEN_VEHICLE_ACTIONS, vehicleId, gasPump);
        view.focus();
    }

    @OnServer('actionMenu:OpenPlayerActions')
    static async openPlayerActions(playerId: number): Promise<void> {
        if (HUD.isDisabled) return;
        const view: alt.WebView = await WebViewController.get();
        WebViewController.showCursor(true);
        HUD.cameraControlTick = alt.everyTick(() => {
            native.disableControlAction(1, 1, true);
            native.disableControlAction(1, 2, true);
            native.disableControlAction(1, 3, true);
            native.disableControlAction(1, 4, true);
            native.disableControlAction(1, 5, true);
            native.disableControlAction(1, 6, true);
        });
        view.emit(WebViewEvents.HUD_OPEN_PLAYER_ACTIONS, playerId);
        view.focus();
    }

    @OnServer('actionMenu:CloseActions')
    static async closeActions(): Promise<void> {
        if (HUD.isDisabled) return;
        const view: alt.WebView = await WebViewController.get();
        WebViewController.showCursor(false);
        view.emit(WebViewEvents.HUD_CLOSE_ACTIONS);
        view.unfocus();
        if (HUD.cameraControlTick === 0) return;
        alt.clearEveryTick(HUD.cameraControlTick);
        HUD.cameraControlTick = 0;
    }

    static proceedAction(menuType: string, menuAction: string, entityId: number) {
        EmitServer('actionMenu:ProceedAction', menuType, menuAction, entityId);
    }
}
