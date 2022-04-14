import * as alt from 'alt-client';
import * as native from 'natives';
import { SYSTEM_EVENTS } from '../../shared/enums/system';
import ICharacter from '../../shared/interface/ICharacter';
import ICharacterAppearence from '../../shared/interface/ICharacterAppearence';
import ICharacterClothing from '../../shared/interface/ICharacterClothing';
import { WebViewController } from '../extensions/webViewController';
import CameraManager from '../systems/cameraManager';

let ped: number;

export default class CharSelector {
    static async open(characters: ICharacter[], allowSecondCharacter: boolean): Promise<void> {
        await CameraManager.createCamera(
            new alt.Vector3(-453.476, 277, 79.75),
            new alt.Vector3(-10, 0, 175.25),
            55,
            true
        );
        native.doScreenFadeIn(0);
        const view = await WebViewController.get();
        view.on('charSelectorReady', () => CharSelector.charSelectorReady(characters, allowSecondCharacter));
        view.on('showPed', CharSelector.showPed);

        WebViewController.openPages(['CharSelector']);
        WebViewController.focus();
        WebViewController.showCursor(true);
    }

    static async charSelectorReady(characters: ICharacter[], allowSecondCharacter: boolean): Promise<void> {
        const view = await WebViewController.get();
        view.emit('setData', characters, allowSecondCharacter);
    }

    static async showPed(clothes: ICharacterClothing, appearance: ICharacterAppearence): Promise<void> {
        appearance.male
            ? await alt.Utils.requestModel('mp_m_freemode_01')
            : await alt.Utils.requestModel('mp_f_freemode_01');
        if (ped != null) {
            native.taskGoStraightToCoord(ped, -457.725, 274.483, 78.515, 1, -1, 0, 0);
            await alt.Utils.waitFor(() => {
                return native.getScriptTaskStatus(ped, 0x7d8f4411) == 7;
            }, 3000);
            native.deletePed(ped);
            ped = null;
        }
        ped = native.createPed(
            4,
            appearance.male ? alt.hash('mp_m_freemode_01') : alt.hash('mp_f_freemode_01'),
            -457.725,
            274.483,
            78.515,
            0,
            false,
            false
        );
        native.setEntityInvincible(ped, true);
        await alt.Utils.waitFor(() => native.doesEntityExist(ped));

        native.setPedHeadBlendData(
            ped,
            appearance.headBlendData.shapeFirstID,
            appearance.headBlendData.shapeSecondID,
            0,
            appearance.headBlendData.skinFirstID,
            appearance.headBlendData.skinSecondID,
            0,
            appearance.headBlendData.shapeMix,
            appearance.headBlendData.skinMix,
            0,
            false
        );
        for (let i = 0; i < appearance.headBlendPaletteColor.length; i++) {
            native.setHeadBlendPaletteColor(
                ped,
                appearance.headBlendPaletteColor[i].r,
                appearance.headBlendPaletteColor[i].g,
                appearance.headBlendPaletteColor[i].b,
                appearance.headBlendPaletteColor[i].id
            );
        }
        for (let i = 0; i < appearance.faceFeature.length; i++) {
            native.setPedFaceFeature(ped, appearance.faceFeature[i].index, appearance.faceFeature[i].scale);
        }
        for (let i = 0; i < appearance.headOverlay.length; i++) {
            native.setPedHeadOverlay(
                ped,
                appearance.headOverlay[i].overlayID,
                appearance.headOverlay[i].index,
                appearance.headOverlay[i].opacity
            );
            native.setPedHeadOverlayColor(
                ped,
                appearance.headOverlay[i].overlayID,
                appearance.headOverlay[i].colorType,
                appearance.headOverlay[i].colorIndex,
                appearance.headOverlay[i].secondColorIndex
            );
        }
        native.setPedEyeColor(ped, appearance.eyeColor);
        native.setPedHairColor(ped, appearance.hairColor.colorId, appearance.hairColor.highlightColorId);

        for (let i = 0; i < clothes.clothes.length; i++) {
            alt.setPedDlcClothes(
                ped,
                alt.hash(clothes.clothes[i].dlc),
                i,
                clothes.clothes[i].drawable,
                clothes.clothes[i].texture,
                clothes.clothes[i].palette
            );
        }
        alt.setPedDlcProp(
            ped,
            alt.hash(clothes.props.hat.dlc),
            0,
            clothes.props.hat.drawable,
            clothes.props.hat.texture
        );
        alt.setPedDlcProp(
            ped,
            alt.hash(clothes.props.glasses.dlc),
            1,
            clothes.props.glasses.drawable,
            clothes.props.glasses.texture
        );
        alt.setPedDlcProp(
            ped,
            alt.hash(clothes.props.ear.dlc),
            2,
            clothes.props.ear.drawable,
            clothes.props.ear.texture
        );
        alt.setPedDlcProp(
            ped,
            alt.hash(clothes.props.watch.dlc),
            6,
            clothes.props.watch.drawable,
            clothes.props.watch.texture
        );
        alt.setPedDlcProp(
            ped,
            alt.hash(clothes.props.bracelet.dlc),
            7,
            clothes.props.bracelet.drawable,
            clothes.props.bracelet.texture
        );

        native.taskGoStraightToCoord(ped, -453.65, 274.457, 78, 1, -1, 0, 0);
    }
}

alt.onServer(SYSTEM_EVENTS.CHAR_SELECTOR_OPEN, CharSelector.open);
