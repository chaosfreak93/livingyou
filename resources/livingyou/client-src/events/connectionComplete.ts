import * as alt from 'alt-client';
import * as native from 'natives';
import IPLManager from '../systems/iplmanager';
import CameraManager from '../systems/cameraManager';
import { EmitServer } from '../systems/eventSystem/emit';

alt.on('resourceStart', handleConnectionComplete);

async function handleConnectionComplete(): Promise<void> {
    CameraManager.destroyCamera();
    native.doScreenFadeOut(0);
    native.displayHud(false);
    native.displayRadar(false);
    alt.setWatermarkPosition(1);
    IPLManager.initializeDefaultIPLs();
    IPLManager.initializeEntitySets();

    EmitServer('connection:Begin');
}

alt.everyTick(() => {
    native.hideHudComponentThisFrame(6); // Vehicle Name
    native.hideHudComponentThisFrame(8); // Vehicle Class
    native.hideHudComponentThisFrame(9); // Street Name
    alt.setConfigFlag('DISABLE_IDLE_CAMERA', true);
    native.setPedConfigFlag(alt.Player.local.scriptID, 35, false);
    native.drawRect(0, 0, 0, 0, 0, 0, 0, 0, false);
});
