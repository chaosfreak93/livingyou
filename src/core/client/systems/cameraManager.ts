import * as alt from 'alt-client';
import * as native from 'natives';

let camera: number;

export function createCamera(position: alt.Vector3, rotation: alt.Vector3, fov: number): void {
    if (camera != null) {
        destroyCamera();
    }

    camera = native.createCam("DEFAULT_SCRIPTED_CAMERA", false);
    setCameraPosition(position);
    setCameraRotation(rotation);
    setCameraFov(fov);
    native.setCamActive(camera, true);
    native.renderScriptCams(true, false, 0, false, false, 0);
}

export function destroyCamera(): void {
    native.renderScriptCams(false, false, 0, false, false, 0);
    native.setCamActive(camera, false);
    native.destroyCam(camera, true);
}

export function destroyAllCameras(): void {
    native.renderScriptCams(false, false, 0, false, false, 0);
    native.destroyAllCams(true);
}

export function setCameraPosition(position: alt.Vector3): void {
    native.setCamCoord(camera, position.x, position.y, position.z);
}

export function setCameraRotation(rotation: alt.Vector3): void {
    native.setCamRot(camera, rotation.x, rotation.y, rotation.z, 2);
}

export function setCameraFov(fov: number): void {
    native.setCamFov(camera, fov);
}

export default {
    createCamera,
    destroyCamera,
    destroyAllCameras,
    setCameraPosition,
    setCameraRotation,
    setCameraFov
}