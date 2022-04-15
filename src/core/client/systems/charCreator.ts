import * as alt from 'alt-client';
import * as native from 'natives';
import { SYSTEM_EVENTS } from '../../shared/enums/system';
import { WebViewController } from '../extensions/webViewController';
import CameraManager from '../systems/cameraManager';

let zpos = 0;
let ped: number;

export default class CharCreator {
    static async open(): Promise<void> {
        await CharCreator.spawnPed();
        const startPosition = native.getOffsetFromEntityInWorldCoords(ped, -0.25, 0, 0) as alt.Vector3;

        const forwardVector = native.getEntityForwardVector(ped) as alt.Vector3;
        const forwardCameraPosition = {
            x: startPosition.x + forwardVector.x * 1.2,
            y: startPosition.y + forwardVector.y * 1.2,
            z: startPosition.z + zpos,
        } as alt.Vector3;
        const startCamPosition = forwardCameraPosition;
        await CameraManager.createCamera(startCamPosition, new alt.Vector3(0, 0, 0), 90, true);
        CameraManager.pointCameraAtCoord(startPosition);
        native.doScreenFadeIn(0);
        const view = await WebViewController.get();
        view.on('charCreatorReady', CharCreator.charCreatorReady);
        view.on('changeGender', CharCreator.changeGender);
        view.on('setHeadBlendData', CharCreator.setHeadBlendData);
        view.on('setHeadBlendPaletteColor', CharCreator.setHeadBlendPaletteColor);

        WebViewController.openPages(['CharCreator']);
        WebViewController.focus();
        WebViewController.showCursor(true);
    }

    static async charCreatorReady(): Promise<void> {
        const view = await WebViewController.get();
    }

    static async spawnPed(): Promise<void> {
        await alt.Utils.requestModel('mp_m_freemode_01');
        ped = native.createPed(4, alt.hash('mp_m_freemode_01'), -75.204, -819.362, 325.5, 0, false, false);
        await alt.Utils.waitFor(() => native.doesEntityExist(ped));
        native.setEntityInvincible(ped, true);
    }

    static async changeGender(male: boolean): Promise<void> {
        native.deletePed(ped);
        ped = null;
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

    static setHeadBlendPaletteColor(index: number, color: { r: number; g: number; b: number }) {
        native.setHeadBlendPaletteColor(ped, color.r, color.g, color.b, index);
    }
}

alt.on(SYSTEM_EVENTS.CHAR_CREATOR_OPEN, CharCreator.open);
alt.on('disconnect', () => {
    if (ped != null) {
        native.deletePed(ped);
        ped = null;
    }
});
