import * as alt from 'alt-client';
import * as native from 'natives';
import { SYSTEM_EVENTS } from '../../shared/enums/system';
import ScreenFade from '../utility/screenFade';

export default class HUD {
    static async open() {
        native.displayHud(true);
        alt.toggleGameControls(true);
        await ScreenFade.fadeIn(0);
    }

    static showDriveHud() {
        native.displayRadar(true);
    }

    static hideDriveHud() {
        native.displayRadar(false);
    }
}

alt.on(SYSTEM_EVENTS.HUD_OPEN, HUD.open);
alt.onServer(SYSTEM_EVENTS.HUD_OPEN, HUD.open);
alt.on('enteredVehicle', HUD.showDriveHud);
alt.on('leftVehicle', HUD.hideDriveHud);
