import * as alt from 'alt-client';
import * as native from 'natives';
import ScreenFade from '../utility/screenFade';
import { On, OnServer } from './eventSystem/on';

export default class HUD {
    @OnServer('hud:Open')
    static async open() {
        native.displayHud(true);
        alt.toggleGameControls(true);
        await ScreenFade.fadeIn(0);
    }

    @On('enteredVehicle')
    static showDriveHud() {
        native.displayRadar(true);
    }

    @On('leftVehicle')
    static hideDriveHud() {
        native.displayRadar(false);
    }
}
