import * as alt from 'alt-client';
import * as native from 'natives';
import { WebViewEvents } from '../../shared/enums/WebViewEvents';
import ICharacter from '../../shared/interface/ICharacter';
import ICharacterAppearence from '../../shared/interface/ICharacterAppearence';
import ICharacterClothing from '../../shared/interface/ICharacterClothe';
import { WebViewController } from '../extensions/webViewController';
import CameraManager from '../systems/cameraManager';
import ScreenFade from '../utility/screenFade';
import CharCreator from './charCreator';
import { EmitServer } from './eventSystem/emit';
import { On, OnServer } from './eventSystem/on';

let ped: number = 0;

export default class CharSelector {
    @OnServer('charSelector:Open')
    static async open(characters: ICharacter[], allowSecondCharacter: boolean): Promise<void> {
        await CameraManager.createCamera(
            new alt.Vector3(-453.476, 277, 79.75),
            new alt.Vector3(-10, 0, 175.25),
            55,
            true
        );
        await ScreenFade.fadeIn(0);
        const view: alt.WebView = await WebViewController.get();
        view.on(WebViewEvents.CHAR_SELECTOR_READY, () => CharSelector.ready(characters, allowSecondCharacter));
        view.on(WebViewEvents.CHAR_SELECTOR_SHOW_PED, CharSelector.showPed);
        view.on(WebViewEvents.CHAR_SELECTOR_OPEN_CHAR_CREATOR, CharSelector.openCharCreator);
        view.on(WebViewEvents.CHAR_SELECTOR_SELECT_CHARACTER, CharSelector.selectCharacter);

        await WebViewController.openPages(['CharSelector']);
        await WebViewController.focus();
        await WebViewController.showCursor(true);
    }

    @On('disconnect')
    @OnServer('charSelector:Close')
    static async close(): Promise<void> {
        await WebViewController.showCursor(false);
        await WebViewController.unfocus();
        await WebViewController.closePages(['CharSelector']);

        const view: alt.WebView = await WebViewController.get();
        view.off(WebViewEvents.CHAR_SELECTOR_READY, () => CharSelector.ready(null, null));
        view.off(WebViewEvents.CHAR_SELECTOR_SHOW_PED, CharSelector.showPed);
        view.off(WebViewEvents.CHAR_SELECTOR_OPEN_CHAR_CREATOR, CharSelector.openCharCreator);
        view.off(WebViewEvents.CHAR_SELECTOR_SELECT_CHARACTER, CharSelector.selectCharacter);
        await ScreenFade.fadeOut(0);
        CameraManager.destroyCamera();
        native.deletePed(ped);
        ped = 0;
    }

    static async ready(characters: ICharacter[], allowSecondCharacter: boolean): Promise<void> {
        const view: alt.WebView = await WebViewController.get();
        view.emit(WebViewEvents.CHAR_SELECTOR_SET_DATA, characters, allowSecondCharacter);
    }

    static async showPed(clothes: any, appearance: any): Promise<void> {
        clothes = JSON.parse(clothes) as ICharacterClothing;
        appearance = JSON.parse(appearance) as ICharacterAppearence;
        appearance.male
            ? await alt.Utils.requestModel('mp_m_freemode_01')
            : await alt.Utils.requestModel('mp_f_freemode_01');
        if (ped !== 0) {
            native.taskGoStraightToCoord(ped, -457.725, 274.483, 78.515, 1, -1, 0, 0);
            await alt.Utils.waitFor(() => {
                return native.getScriptTaskStatus(ped, 0x7d8f4411) == 7;
            }, 3500);
            native.deletePed(ped);
            ped = 0;
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
        await alt.Utils.waitFor(() => native.doesEntityExist(ped));
        native.setEntityInvincible(ped, true);

        native.setPedHeadBlendData(
            ped,
            appearance.headBlendData.mother,
            appearance.headBlendData.father,
            0,
            appearance.headBlendData.mother,
            appearance.headBlendData.father,
            0,
            appearance.headBlendData.similarityAnatomy,
            appearance.headBlendData.similaritySkinColor,
            0,
            false
        );
        for (let i = 0; i < appearance.faceFeature.length; i++) {
            native.setPedMicroMorph(ped, i, appearance.faceFeature[i].scale);
        }
        for (let i = 0; i < appearance.headOverlay.length; i++) {
            native.setPedHeadOverlay(
                ped,
                i,
                appearance.headOverlay[i].index == -1 ? 255 : appearance.headOverlay[i].index,
                appearance.headOverlay[i].opacity
            );
        }
        for (let i = 0; i < appearance.headOverlay.length; i++) {
            native.setPedHeadOverlayTint(
                ped,
                i,
                appearance.headOverlay[i].colorType,
                appearance.headOverlay[i].colorIndex,
                0
            );
        }
        native.setHeadBlendEyeColor(ped, appearance.eyeColor);
        native.setPedHairTint(ped, appearance.hairColor.colorId, appearance.hairColor.highlightColorId);

        for (let i = 0; i < clothes.clothes.length; i++) {
            alt.setPedDlcClothes(
                ped,
                clothes.clothes[i].dlc,
                clothes.clothes[i].component,
                clothes.clothes[i].drawable,
                clothes.clothes[i].texture,
                clothes.clothes[i].palette
            );
        }

        for (let i = 0; i < clothes.props.length; i++) {
            if (clothes.props[i].drawable == -1) {
                alt.clearPedProp(ped, clothes.props[i].component);
            } else {
                alt.setPedDlcProp(
                    ped,
                    clothes.props[i].dlc,
                    clothes.props[i].component,
                    clothes.props[i].drawable,
                    clothes.props[i].texture
                );
            }
        }

        native.taskGoStraightToCoord(ped, -453.65, 274.457, 78, 1, -1, 0, 0);
    }

    static async openCharCreator(): Promise<void> {
        await CharSelector.close();
        await CharCreator.open();
    }

    static selectCharacter(character: string): void {
        EmitServer('charSelector:SelectChar', character);
    }
}
