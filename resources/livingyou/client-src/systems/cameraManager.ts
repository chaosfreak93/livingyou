import * as alt from 'alt-client';
import * as native from 'natives';

let camera: number = 0;

export default class CameraManager {
    static async createCamera(
        position: alt.Vector3,
        rotation: alt.Vector3,
        fov: number,
        loadScene: boolean
    ): Promise<void> {
        if (CameraManager.cameraExists()) {
            CameraManager.destroyCamera();
        }

        if (loadScene) {
            if (alt.FocusData.isFocusOverriden) {
                alt.FocusData.clearFocus();
            }
            alt.FocusData.overrideFocus(position);
        }

        camera = native.createCam('DEFAULT_SCRIPTED_CAMERA', false);
        CameraManager.setCameraPosition(position);
        CameraManager.setCameraRotation(rotation);
        CameraManager.setCameraFov(fov);
        CameraManager.setCamActive();
    }

    static destroyCamera(): void {
        if (CameraManager.cameraExists()) {
            native.destroyCam(camera, true);
            camera = 0;
        }

        alt.FocusData.clearFocus();
        native.destroyAllCams(false);
        native.renderScriptCams(false, false, 0, false, false, 0);
    }

    static cameraExists(): boolean {
        return camera !== 0;
    }

    static setCameraPosition(position: alt.Vector3): void {
        native.setCamCoord(camera, position.x, position.y, position.z);
    }

    static getCameraPosition(): alt.Vector3 {
        return native.getCamCoord(camera);
    }

    static setCameraRotation(rotation: alt.Vector3): void {
        native.setCamRot(camera, rotation.x, rotation.y, rotation.z, 2);
    }

    static getCameraRotation(): alt.Vector3 {
        return native.getCamRot(camera, 2);
    }

    static setCameraFov(fov: number): void {
        native.setCamFov(camera, fov);
    }

    static getCameraFov(): number {
        return native.getCamFov(camera);
    }

    static pointCameraAtCoord(position: alt.Vector3): void {
        native.pointCamAtCoord(camera, position.x, position.y, position.z);
    }

    static setCamActive(): void {
        native.setCamActive(camera, true);
        native.renderScriptCams(true, false, 0, true, false, 0);
    }
}
