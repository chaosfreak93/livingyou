import * as alt from 'alt-client';
import * as native from 'natives';
import { loadModel } from '../utility/model';

let webview: alt.WebView = null;
let cam: number;
let zpos = 0;
let fov = 90;
let startPosition: alt.Vector3;
let startCamPosition: alt.Vector3;

alt.onServer('triggerCharCreator', async () => {
    webview = new alt.WebView('http://resource/webview/char_selector/index.html');
    webview.focus();
    alt.showCursor(true);
});

function createEditCamera(scriptId: number) {
    startPosition = native.getOffsetFromEntityInWorldCoords(scriptId, -0.25, 0, 0) as alt.Vector3;

    if (!cam) {
        const forwardVector = native.getEntityForwardVector(scriptId) as alt.Vector3;
        const forwardCameraPosition = {
            x: startPosition.x + forwardVector.x * 1.2,
            y: startPosition.y + forwardVector.y * 1.2,
            z: startPosition.z + zpos,
        } as alt.Vector3;

        fov = 90;
        startCamPosition = forwardCameraPosition;

        cam = native.createCamWithParams('DEFAULT_SCRIPTED_CAMERA', startCamPosition.x, startCamPosition.y, startCamPosition.z, 0, 0, 0, fov, true, 0);

        native.pointCamAtCoord(cam, startPosition.x, startPosition.y, startPosition.z);
        native.setCamActive(cam, true);
        native.renderScriptCams(true, false, 0, true, false, 0);
    }
}