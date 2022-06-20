import * as alt from 'alt-client';
import * as native from 'natives';
import { WebViewController } from '../extensions/webViewController';
import ScreenFade from '../utility/screenFade';
import { On, OnServer } from './eventSystem/on';

let isDisabled = false;
let hasRegistered = false;

export default class HUD {
    static async open() {
        if (!hasRegistered) {
            WebViewController.registerOverlay('HUD', HUD.setVisible);
            hasRegistered = true;
        }

        const view = await WebViewController.get();
        view.on(`hudReady`, HUD.ready);

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
        view.off(`hudReady`, HUD.ready);
        native.displayHud(false);
    }

    static ready() {}

    @On('enteredVehicle')
    static showDriveHud() {
        native.displayRadar(true);
    }

    @On('leftVehicle')
    static hideDriveHud() {
        native.displayRadar(false);
    }
}
