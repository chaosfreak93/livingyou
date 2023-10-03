import * as alt from 'alt-client';
import * as native from 'natives';
import { WebViewEvents } from '../../shared/enums/WebViewEvents';
import { WebViewController } from '../extensions/webViewController';
import CameraManager from '../systems/cameraManager';
import ScreenFade from '../utility/screenFade';
import { EmitServer } from './eventSystem/emit';
import { On, OnServer } from './eventSystem/on';

let zpos: number = 0;
let startPosition: alt.Vector3;
let startCamPosition: alt.Vector3;
let ped: number = 0;
let handleCameraTick: number = 0;

export default class CharCreator {
    @OnServer('charCreator:Open')
    static async open(): Promise<void> {
        alt.toggleGameControls(true);
        await CharCreator.spawnPed(true);
        startPosition = native.getOffsetFromEntityInWorldCoords(ped, 0.125, 0, 0) as alt.Vector3;

        const forwardVector = native.getEntityForwardVector(ped) as alt.Vector3;
        const forwardCameraPosition = new alt.Vector3(
            startPosition.x + forwardVector.x * 1.2,
            startPosition.y + forwardVector.y * 1.2,
            startPosition.z + zpos
        );
        startCamPosition = forwardCameraPosition;
        await CameraManager.createCamera(startCamPosition, new alt.Vector3(0, 0, 0), 50, true);
        await alt.Utils.waitFor(() => !native.isPedFalling(ped));
        CameraManager.pointCameraAtCoord(startPosition);
        handleCameraTick = alt.everyTick(CharCreator.cameraControls);
        await ScreenFade.fadeIn(0);
        const view = await WebViewController.get();
        view.on(WebViewEvents.CHAR_CREATOR_READY, CharCreator.charCreatorReady);
        view.on(WebViewEvents.CHAR_CREATOR_CHANGE_GENDER, CharCreator.spawnPed);
        view.on(WebViewEvents.CHAR_CREATOR_SET_HEAD_BLEND_DATA, CharCreator.setHeadBlendData);
        view.on(WebViewEvents.CHAR_CREATOR_SET_FACE_FEATURE, CharCreator.setFaceFeature);
        view.on(WebViewEvents.CHAR_CREATOR_SET_HEAD_OVERLAY, CharCreator.setHeadOverlay);
        view.on(WebViewEvents.CHAR_CREATOR_SET_HEAD_OVERLAY_COLOR, CharCreator.setHeadOverlayColor);
        view.on(WebViewEvents.CHAR_CREATOR_SET_EYE_COLOR, CharCreator.setEyeColor);
        view.on(WebViewEvents.CHAR_CREATOR_SET_HAIR_COLOR, CharCreator.setHairColor);
        view.on(WebViewEvents.CHAR_CREATOR_SET_CLOTHE, CharCreator.setClothe);
        view.on(WebViewEvents.CHAR_CREATOR_SET_PROP, CharCreator.setProp);
        view.on(WebViewEvents.CHAR_CREATOR_FINISH_CHARACTER, CharCreator.finishCharacter);

        await WebViewController.openPages(['CharCreator']);
        await WebViewController.focus();
        await WebViewController.showCursor(true);
    }

    @On('disconnect')
    @OnServer('charCreator:Close')
    static async close(): Promise<void> {
        await WebViewController.showCursor(false);
        await WebViewController.unfocus();
        await WebViewController.closePages(['CharCreator']);

        const view = await WebViewController.get();
        view.off(WebViewEvents.CHAR_CREATOR_READY, CharCreator.charCreatorReady);
        view.off(WebViewEvents.CHAR_CREATOR_CHANGE_GENDER, CharCreator.spawnPed);
        view.off(WebViewEvents.CHAR_CREATOR_SET_HEAD_BLEND_DATA, CharCreator.setHeadBlendData);
        view.off(WebViewEvents.CHAR_CREATOR_SET_FACE_FEATURE, CharCreator.setFaceFeature);
        view.off(WebViewEvents.CHAR_CREATOR_SET_HEAD_OVERLAY, CharCreator.setHeadOverlay);
        view.off(WebViewEvents.CHAR_CREATOR_SET_HEAD_OVERLAY_COLOR, CharCreator.setHeadOverlayColor);
        view.off(WebViewEvents.CHAR_CREATOR_SET_EYE_COLOR, CharCreator.setEyeColor);
        view.off(WebViewEvents.CHAR_CREATOR_SET_HAIR_COLOR, CharCreator.setHairColor);
        view.off(WebViewEvents.CHAR_CREATOR_SET_CLOTHE, CharCreator.setClothe);
        view.off(WebViewEvents.CHAR_CREATOR_SET_PROP, CharCreator.setProp);
        view.off(WebViewEvents.CHAR_CREATOR_FINISH_CHARACTER, CharCreator.finishCharacter);
        await ScreenFade.fadeOut(0);
        if (handleCameraTick !== 0) {
            alt.clearEveryTick(handleCameraTick);
            handleCameraTick = 0;
        }
        CameraManager.destroyCamera();
        native.deletePed(ped);
        ped = 0;
        alt.toggleGameControls(false);
    }

    static async charCreatorReady(): Promise<void> {
        let clothesMax: number[] = [];
        let propsMax: number[] = [];
        for (let i = 0; i <= 11; i++) {
            clothesMax[i] = native.getNumberOfPedDrawableVariations(ped, i);
        }
        propsMax[0] = native.getNumberOfPedPropDrawableVariations(ped, 0);
        propsMax[1] = native.getNumberOfPedPropDrawableVariations(ped, 1);
        propsMax[2] = native.getNumberOfPedPropDrawableVariations(ped, 2);
        propsMax[3] = native.getNumberOfPedPropDrawableVariations(ped, 6);
        propsMax[4] = native.getNumberOfPedPropDrawableVariations(ped, 7);
        const view = await WebViewController.get();
        view.emit(WebViewEvents.CHAR_CREATOR_SET_DATA, clothesMax, propsMax);
    }

    static async spawnPed(male: boolean): Promise<void> {
        if (ped !== 0) {
            native.deletePed(ped);
            ped = 0;
        }
        male ? await alt.Utils.requestModel('mp_m_freemode_01') : await alt.Utils.requestModel('mp_f_freemode_01');
        ped = native.createPed(
            4,
            male ? alt.hash('mp_m_freemode_01') : alt.hash('mp_f_freemode_01'),
            -75.204,
            -819.362,
            325.5,
            0,
            false,
            false
        );
        await alt.Utils.waitFor(() => native.doesEntityExist(ped));
        native.setEntityInvincible(ped, true);
        native.setPedHeadBlendData(ped, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
        native.clearAllPedProps(ped, 0);
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
        native.setPedMicroMorph(ped, index, scale);
    }

    static setHeadOverlay(overlayId: number, index: number, opacity: number) {
        native.setPedHeadOverlay(ped, overlayId, index, opacity);
    }

    static setHeadOverlayColor(overlayId: number, colorType: number, colorIndex: number) {
        native.setPedHeadOverlayTint(ped, overlayId, colorType, colorIndex, 0);
    }

    static setEyeColor(eyeColor: number) {
        native.setHeadBlendEyeColor(ped, eyeColor);
    }

    static setHairColor(colorId: number, highlightColorId: number) {
        native.setPedHairTint(ped, colorId, highlightColorId);
    }

    static setClothe(component: number, drawable: number, texture: number) {
        native.setPedComponentVariation(
            ped,
            parseInt(component.toString()),
            parseInt(drawable.toString()),
            parseInt(texture.toString()),
            0
        );
    }

    static setProp(component: number, drawable: number, texture: number) {
        if (drawable == -1) {
            native.clearPedProp(ped, parseInt(component.toString()), 0);
        } else {
            native.setPedPropIndex(
                ped,
                parseInt(component.toString()),
                parseInt(drawable.toString()),
                parseInt(texture.toString()),
                true,
                0
            );
        }
    }

    static finishCharacter(character: string) {
        EmitServer('charCreator:FinishChar', character);
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

        if (ped === 0 || !native.doesEntityExist(ped)) {
            return;
        }

        const res: alt.Vector2 = alt.getScreenResolution();
        const width: number = res.x;
        const cursor: alt.Vector2 = alt.getCursorPos();
        const _x: number = cursor.x;
        let oldHeading: number = native.getEntityHeading(ped);
        let fov: number = CameraManager.getCameraFov();

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
                const newHeading: number = (oldHeading -= 2);
                native.setEntityHeading(ped, newHeading);
            }

            // Rotate Positive
            if (_x > width / 2) {
                const newHeading: number = (oldHeading += 2);
                native.setEntityHeading(ped, newHeading);
            }
        }

        // D
        if (native.isDisabledControlPressed(0, 35)) {
            const newHeading: number = (oldHeading += 2);
            native.setEntityHeading(ped, newHeading);
        }

        // A
        if (native.isDisabledControlPressed(0, 34)) {
            const newHeading: number = (oldHeading -= 2);
            native.setEntityHeading(ped, newHeading);
        }
    }
}
