import * as alt from 'alt-client';
import * as native from 'natives';
import { SYSTEM_EVENTS } from '../../shared/enums/system';
import { WebViewController } from '../extensions/webViewController';
import CameraManager from '../systems/cameraManager';

let zpos = 0;
let startPosition: alt.Vector3;
let startCamPosition: alt.Vector3;
let ped: number;
let handleCameraTick: number;

export default class CharCreator {
    static async open(): Promise<void> {
        alt.toggleGameControls(true);
        await CharCreator.spawnPed(true);
        startPosition = native.getOffsetFromEntityInWorldCoords(ped, 0.125, 0, 0) as alt.Vector3;

        const forwardVector = native.getEntityForwardVector(ped) as alt.Vector3;
        const forwardCameraPosition = {
            x: startPosition.x + forwardVector.x * 1.2,
            y: startPosition.y + forwardVector.y * 1.2,
            z: startPosition.z + zpos,
        } as alt.Vector3;
        startCamPosition = forwardCameraPosition;
        await CameraManager.createCamera(startCamPosition, new alt.Vector3(0, 0, 0), 50, true);
        await alt.Utils.waitFor(() => !native.isPedFalling(ped));
        CameraManager.pointCameraAtCoord(startPosition);
        handleCameraTick = alt.everyTick(CharCreator.cameraControls);
        native.doScreenFadeIn(0);
        const view = await WebViewController.get();
        view.on('charCreatorReady', CharCreator.charCreatorReady);
        view.on('changeGender', CharCreator.changeGender);
        view.on('setHeadBlendData', CharCreator.setHeadBlendData);
        view.on('setFaceFeature', CharCreator.setFaceFeature);
        view.on('setHeadOverlay', CharCreator.setHeadOverlay);
        view.on('setHeadOverlayColor', CharCreator.setHeadOverlayColor);
        view.on('setEyeColor', CharCreator.setEyeColor);
        view.on('setHairColor', CharCreator.setHairColor);

        WebViewController.openPages(['CharCreator']);
        WebViewController.focus();
        WebViewController.showCursor(true);
    }

    static async charCreatorReady(): Promise<void> {
        const view = await WebViewController.get();
        view.emit('showCreator');
    }

    static async spawnPed(male: boolean): Promise<void> {
        if (ped != null) {
            native.deletePed(ped);
            ped = null;
        }
        male ? await alt.Utils.requestModel('mp_m_freemode_01') : await alt.Utils.requestModel('mp_f_freemode_01');
        ped = native.createPed(4, male ? alt.hash('mp_m_freemode_01') : alt.hash('mp_f_freemode_01'), -75.204, -819.362, 325.5, 0, false, false);
        await alt.Utils.waitFor(() => native.doesEntityExist(ped));
        native.setEntityInvincible(ped, true);
        native.setPedHeadBlendData(ped, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
        native.clearAllPedProps(ped);
        if (!male) {
            native.setPedComponentVariation(ped, 1, 0, 0, 0); // mask
            native.setPedComponentVariation(ped, 3, 15, 0, 0); // arms
            native.setPedComponentVariation(ped, 4, 14, 0, 0); // pants
            native.setPedComponentVariation(ped, 5, 0, 0, 0); // bag
            native.setPedComponentVariation(ped, 6, 35, 0, 0); // shoes
            native.setPedComponentVariation(ped, 7, 0, 0, 0); // accessories
            native.setPedComponentVariation(ped, 8, 15, 0, 0); // undershirt
            native.setPedComponentVariation(ped, 9, 0, 0, 0); // body armour
            native.setPedComponentVariation(ped, 11, 15, 0, 0); // torso
        } else {
            native.setPedComponentVariation(ped, 1, 0, 0, 0); // mask
            native.setPedComponentVariation(ped, 3, 15, 0, 0); // arms
            native.setPedComponentVariation(ped, 5, 0, 0, 0); // bag
            native.setPedComponentVariation(ped, 4, 14, 0, 0); // pants
            native.setPedComponentVariation(ped, 6, 34, 0, 0); // shoes
            native.setPedComponentVariation(ped, 7, 0, 0, 0); // accessories
            native.setPedComponentVariation(ped, 8, 15, 0, 0); // undershirt
            native.setPedComponentVariation(ped, 9, 0, 0, 0); // body armour
            native.setPedComponentVariation(ped, 11, 91, 0, 0); // torso
        }
    }

    static async changeGender(male: boolean): Promise<void> {
        CharCreator.spawnPed(male);
    }

    static setHeadBlendData(mother: number, father: number, similarityAnatomy: number, similaritySkinColor: number) {
        native.setPedHeadBlendData(
            ped,
            mother,
            father,
            0,
            mother,
            father,
            0,
            similarityAnatomy,
            similaritySkinColor,
            0,
            false
        );
    }

    static setFaceFeature(index: number, scale: number) {
        native.setPedFaceFeature(ped, index, scale);
    }

    static setHeadOverlay(overlayId: number, index: number, opacity: number) {
        native.setPedHeadOverlay(ped, overlayId, index, opacity);
    }

    static setHeadOverlayColor(overlayId: number, colorType: number, colorIndex: number) {
        native.setPedHeadOverlayColor(ped, overlayId, colorType, colorIndex, 0);
    }

    static setEyeColor(eyeColor: number) {
        native.setPedEyeColor(ped, eyeColor);
    }

    static setHairColor(colorId: number, highlightColorId: number) {
        native.setPedHairColor(ped, colorId, highlightColorId);
    }

    static cameraControls() {
        native.disableAllControlActions(0);
        native.disableAllControlActions(1);
        native.disableControlAction(0, 0, true);
        native.disableControlAction(0, 1, true);
        native.disableControlAction(0, 2, true);
        native.disableControlAction(0, 24, true);
        native.disableControlAction(0, 25, true);
        native.disableControlAction(0, 32, true); // w
        native.disableControlAction(0, 33, true); // s
        native.disableControlAction(0, 34, true); // a
        native.disableControlAction(0, 35, true); // d

        if (!CameraManager.cameraExists()) {
            return;
        }

        if (ped == null || !native.doesEntityExist(ped)) {
            return;
        }

        const res = alt.getScreenResolution();
        const width = res.y;
        const cursor = alt.getCursorPos();
        const _x = cursor.x;
        let oldHeading = native.getEntityHeading(ped);
        let fov = CameraManager.getCameraFov();

        //Scroll Up
        if (native.isDisabledControlPressed(0, 15)) {
            if (_x < width / 2 + 250 && _x > width / 2 - 250) {
                fov -= 2;

                if (fov < 10) {
                    fov = 10;
                }

                CameraManager.setCameraFov(fov);
                CameraManager.setCamActive();
            }
        }

        //Scroll Down
        if (native.isDisabledControlPressed(0, 16)) {
            if (_x < width / 2 + 250 && _x > width / 2 - 250) {
                fov += 2;

                if (fov > 130) {
                    fov = 130;
                }

                CameraManager.setCameraFov(fov);
                CameraManager.setCamActive();
            }
        }

        // W
        if (native.isDisabledControlPressed(0, 32)) {
            zpos += 0.01;

            if (zpos > 1.2) {
                zpos = 1.2;
            }

            CameraManager.setCameraPosition(
                new alt.Vector3(startCamPosition.x, startCamPosition.y, startCamPosition.z + zpos)
            );
            CameraManager.pointCameraAtCoord(new alt.Vector3(startPosition.x, startPosition.y, startPosition.z + zpos));
            CameraManager.setCamActive();
        }

        // S
        if (native.isDisabledControlPressed(0, 33)) {
            zpos -= 0.01;

            if (zpos < -1.2) {
                zpos = -1.2;
            }

            CameraManager.setCameraPosition(
                new alt.Vector3(startCamPosition.x, startCamPosition.y, startCamPosition.z + zpos)
            );
            CameraManager.pointCameraAtCoord(new alt.Vector3(startPosition.x, startPosition.y, startPosition.z + zpos));
            CameraManager.setCamActive();
        }

        // rmb
        if (native.isDisabledControlPressed(0, 25)) {
            // Rotate Negative
            if (_x < width / 2) {
                const newHeading = (oldHeading -= 2);
                native.setEntityHeading(ped, newHeading);
            }

            // Rotate Positive
            if (_x > width / 2) {
                const newHeading = (oldHeading += 2);
                native.setEntityHeading(ped, newHeading);
            }
        }

        // D
        if (native.isDisabledControlPressed(0, 35)) {
            const newHeading = (oldHeading += 2);
            native.setEntityHeading(ped, newHeading);
        }

        // A
        if (native.isDisabledControlPressed(0, 34)) {
            const newHeading = (oldHeading -= 2);
            native.setEntityHeading(ped, newHeading);
        }
    }
}

alt.on(SYSTEM_EVENTS.CHAR_CREATOR_OPEN, CharCreator.open);
alt.on('disconnect', () => {
    if (ped != null) {
        native.deletePed(ped);
        ped = null;
    }

    if (handleCameraTick != null) {
        alt.clearEveryTick(handleCameraTick);
        handleCameraTick = null;
    }
});
