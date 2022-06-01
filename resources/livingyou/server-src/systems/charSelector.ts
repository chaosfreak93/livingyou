import * as alt from 'alt-server';
import ICharacter from '../../shared/interface/ICharacter';
import { EmitClient } from './eventSystem/emit';
import { OnClient } from './eventSystem/on';

export default class CharSelector {
    @OnClient('charSelector:SelectChar')
    static async selectChar(player: alt.Player, character: ICharacter) {
        player.character = character;
        player.dimension = 0;
        player.setHeadBlendData(
            character.characterAppearence.headBlendData.mother,
            character.characterAppearence.headBlendData.father,
            0,
            character.characterAppearence.headBlendData.mother,
            character.characterAppearence.headBlendData.father,
            0,
            character.characterAppearence.headBlendData.similarityAnatomy,
            character.characterAppearence.headBlendData.similaritySkinColor,
            0
        );
        for (let i = 0; i < character.characterAppearence.faceFeature.length; i++) {
            player.setFaceFeature(i, character.characterAppearence.faceFeature[i].scale);
        }
        for (let i = 0; i < character.characterAppearence.headOverlay.length; i++) {
            player.setHeadOverlay(
                i,
                character.characterAppearence.headOverlay[i].index,
                character.characterAppearence.headOverlay[i].opacity
            );
        }
        for (let i = 0; i < character.characterAppearence.headOverlay.length; i++) {
            player.setHeadOverlayColor(
                i,
                character.characterAppearence.headOverlay[i].colorType,
                character.characterAppearence.headOverlay[i].colorIndex,
                0
            );
        }
        player.setEyeColor(character.characterAppearence.eyeColor);
        player.setHairColor(character.characterAppearence.hairColor.colorId);
        player.setHairHighlightColor(character.characterAppearence.hairColor.highlightColorId);

        for (let i = 0; i < character.characterClothing.clothes.length; i++) {
            player.setClothes(
                character.characterClothing.clothes[i].component,
                character.characterClothing.clothes[i].drawable,
                character.characterClothing.clothes[i].texture,
                0
            );
        }

        for (let i = 0; i < character.characterClothing.props.length; i++) {
            if (character.characterClothing.props[i].drawable == -1) {
                player.clearProp(character.characterClothing.props[i].component);
            } else {
                player.setProp(
                    character.characterClothing.props[i].component,
                    character.characterClothing.props[i].drawable,
                    character.characterClothing.props[i].texture
                );
            }
        }

        EmitClient(player, 'player:StartTicks');

        if (!character.lastKnownLocation) {
            new alt.Vehicle('akuma', 221.6855926513672, -902.0967407226562, 30.69318962097168, 0, 0, 0);
            player.setPosition(player, 221.6855926513672, -902.0967407226562, 30.69318962097168);
        } else {
            new alt.Vehicle(
                'akuma',
                character.lastKnownLocation.position.x,
                character.lastKnownLocation.position.y,
                character.lastKnownLocation.position.z,
                character.lastKnownLocation.rotation.x,
                character.lastKnownLocation.rotation.y,
                character.lastKnownLocation.rotation.z
            );
            player.setPosition(
                player,
                character.lastKnownLocation.position.x,
                character.lastKnownLocation.position.y,
                character.lastKnownLocation.position.z
            );
            player.rot = character.lastKnownLocation.rotation;
        }
        player.visible = true;
        player.collision = true;
        //player.frozen = false;
        player.time(player);
        player.weather(player);

        EmitClient(player, 'charSelector:Close');
        await alt.Utils.wait(500);
        EmitClient(player, 'hud:Open');
    }
}
