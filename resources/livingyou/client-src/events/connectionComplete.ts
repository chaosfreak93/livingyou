import * as alt from 'alt-client';
import * as native from 'natives';
import IPLManager from '../systems/iplmanager';
import CameraManager from '../systems/cameraManager';
import { EmitServer } from '../systems/eventSystem/emit';
import { On } from '../systems/eventSystem/on';

export default class ConnectionComplete {
    @On('connectionComplete')
    static connectionComplete(): void {
        CameraManager.destroyCamera();
        native.doScreenFadeOut(0);
        native.displayHud(false);
        native.displayRadar(false);
        alt.setWatermarkPosition(1);
        IPLManager.initializeDefaultIPLs();
        IPLManager.initializeEntitySets();

        EmitServer('connection:Begin');
    }

    static hideHudComponents(): void {
        native.hideHudComponentThisFrame(6); // Vehicle Name
        native.hideHudComponentThisFrame(8); // Vehicle Class
        native.hideHudComponentThisFrame(9); // Street Name
    }

    static setPedConfigFlags(): void {
        alt.setConfigFlag('DISABLE_IDLE_CAMERA', true);
        alt.setConfigFlag('DISABLE_AUTO_WEAPON_SWAP', true);
        alt.setConfigFlag('DISABLE_VEHICLE_ENGINE_SHUTDOWN_ON_LEAVE', true);
        native.setPedConfigFlag(alt.Player.local, 429, true);
    }
}

alt.everyTick(() => {
    ConnectionComplete.hideHudComponents();
    ConnectionComplete.setPedConfigFlags();
});
