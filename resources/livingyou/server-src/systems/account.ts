import * as alt from 'alt-server';
import Database from '@stuyk/ezmongodb';
import IAccount from '../interface/IAccount';
import IDiscordData from '../interface/IDiscordData';
import { SYSTEM_EVENTS } from '../../shared/enums/system';
import ICharacter from '../../shared/interface/ICharacter';

alt.on(SYSTEM_EVENTS.DISCORD_FINISH_AUTH, authFinished);

async function authFinished(player: alt.Player, discordData: IDiscordData): Promise<void> {
    let findAccount = await Database.fetchAllByField<IAccount>('discord', discordData.id, 'accounts');
    if (findAccount.length <= 0) {
        const insertedData = await Database.insertData<IAccount>(
            {
                discord: discordData.id,
                email: discordData.email,
                firstJoinTimestamp: new Date().getTime(),
                lastJoinTimestamp: new Date().getTime(),
                allowSecondCharacter: false,
                character: [],
                banned: false,
            },
            'accounts',
            true
        );
        if (insertedData.discord != discordData.id) return;
        findAccount = [];
        findAccount.push(insertedData);
    }
    await Database.updatePartialData(findAccount[0]._id, { lastJoinTimestamp: new Date().getTime() }, 'accounts');

    player.setPosition(player, -453.586, 276.909, 78.515);
    player.discordId = discordData.id;
    alt.emitClient(player, SYSTEM_EVENTS.DISCORD_CLOSE);
    await alt.Utils.wait(500);
    alt.emitClient(
        player,
        SYSTEM_EVENTS.CHAR_SELECTOR_OPEN,
        findAccount[0].character,
        findAccount[0].allowSecondCharacter
    );
}

alt.onClient(SYSTEM_EVENTS.CHAR_SELECTOR_SELECT_CHAR, selectChar);

async function selectChar(player: alt.Player, character: ICharacter) {
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

    alt.emitClient(player, SYSTEM_EVENTS.PLAYER_START_TICKS);

    if (character.lastKnownLocation == null || character.lastKnownLocation == undefined) {
        new alt.Vehicle('akuma', 221.6855926513672, -902.0967407226562, 30.69318962097168, 0, 0, 0);
        player.setPosition(player, 221.6855926513672, -902.0967407226562, 30.69318962097168);
    } else {
        new alt.Vehicle('akuma', character.lastKnownLocation.position.x, character.lastKnownLocation.position.y, character.lastKnownLocation.position.z, character.lastKnownLocation.rotation.x, character.lastKnownLocation.rotation.y, character.lastKnownLocation.rotation.z);
        player.setPosition(player, character.lastKnownLocation.position.x, character.lastKnownLocation.position.y, character.lastKnownLocation.position.z);
        player.rot = character.lastKnownLocation.rotation;
    }
    player.visible = true;
    player.collision = true;
    //player.frozen = false;
    player.time(player);
    player.weather(player);

    alt.emitClient(player, SYSTEM_EVENTS.CHAR_SELECTOR_CLOSE);
    await alt.Utils.wait(500);
    alt.emitClient(player, SYSTEM_EVENTS.HUD_OPEN);
}
