import * as alt from 'alt-client';
import * as native from 'natives';
import IPLManager from '../systems/iplmanager';
import CameraManager from '../systems/cameraManager';
import { SYSTEM_EVENTS } from '../../shared/enums/system';

alt.on('connectionComplete', handleConnectionComplete);

async function handleConnectionComplete(): Promise<void> {
    CameraManager.destroyCamera();
    native.doScreenFadeOut(0);
    native.triggerScreenblurFadeOut(0);
    native.freezeEntityPosition(alt.Player.local.scriptID, true);
    IPLManager.initializeDefaultIPLs();
    IPLManager.initializeEntitySets();

    alt.emitServer(SYSTEM_EVENTS.BEGIN_CONNECTION);
}

alt.everyTick(() => {
    native.hideHudComponentThisFrame(6); // Vehicle Name
    native.hideHudComponentThisFrame(8); // Vehicle Class
    native.hideHudComponentThisFrame(9); // Street Name
});
