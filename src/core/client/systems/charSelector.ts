import * as alt from 'alt-client';
import * as native from 'natives';
import CameraManager from '../systems/cameraManager';

let webview: alt.WebView = null;

alt.onServer('triggerCharCreator', async () => {
    webview = new alt.WebView('http://resource/webview/char_selector/index.html');
    webview.focus();
    alt.showCursor(true);
});

function createEditCamera(scriptId: number) {
    let zpos = 0;
    const startPosition = native.getOffsetFromEntityInWorldCoords(scriptId, -0.25, 0, 0) as alt.Vector3;

    const forwardVector = native.getEntityForwardVector(scriptId) as alt.Vector3;
    const forwardCameraPosition = {
        x: startPosition.x + forwardVector.x * 1.2,
        y: startPosition.y + forwardVector.y * 1.2,
        z: startPosition.z + zpos,
    } as alt.Vector3;
    const startCamPosition = forwardCameraPosition;

    CameraManager.createCamera(startCamPosition, new alt.Vector3(0, 0, 0), 90, true);
    CameraManager.pointCameraAtCoord(startPosition);
}
