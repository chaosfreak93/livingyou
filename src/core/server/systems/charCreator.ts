import * as alt from 'alt-server';
import Database from '@stuyk/ezmongodb';
import { SYSTEM_EVENTS } from '../../shared/enums/system';
import IAccount from '../interface/IAccount';

async function finishChar(player: alt.Player, charInfoString) {
    let charInfo = JSON.parse(charInfoString);
    let findAccount = await Database.fetchAllByField<IAccount>('discord', player.discordId, 'accounts');
    if (findAccount.length <= 0) return;
    await Database.updatePartialData(
        findAccount[0]._id,
        {
            character: [
                {
                    firstName: charInfo.firstName,
                    secondName: charInfo.secondName != '' ? charInfo.secondName : null,
                    lastName: charInfo.lastName,
                    birthday: charInfo.birthday,
                    alive: true,
                    characterAppearence: {
                        male: charInfo.male,
                        headBlendData: {
                            mother: parseInt(charInfo.headBlendData.mother),
                            father: parseInt(charInfo.headBlendData.father),
                            similarityAnatomy: parseFloat(charInfo.headBlendData.similarityAnatomy),
                            similaritySkinColor: parseFloat(charInfo.headBlendData.similaritySkinColor),
                        },
                        faceFeature: [
                            {
                                scale: parseFloat(charInfo.faceFeature[0].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[1].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[2].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[3].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[4].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[5].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[6].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[7].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[8].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[9].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[10].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[11].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[12].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[13].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[14].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[15].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[16].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[17].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[18].scale),
                            },
                            {
                                scale: parseFloat(charInfo.faceFeature[19].scale),
                            },
                        ],
                        headOverlay: [
                            {
                                index: parseInt(charInfo.headOverlay[0].index),
                                opacity: parseFloat(charInfo.headOverlay[0].opacity),
                                colorType: parseInt(charInfo.headOverlay[0].colorType),
                                colorIndex: parseInt(charInfo.headOverlay[0].colorIndex),
                            },
                            {
                                index: parseInt(charInfo.headOverlay[1].index),
                                opacity: parseFloat(charInfo.headOverlay[1].opacity),
                                colorType: parseInt(charInfo.headOverlay[1].colorType),
                                colorIndex: parseInt(charInfo.headOverlay[1].colorIndex),
                            },
                            {
                                index: parseInt(charInfo.headOverlay[2].index),
                                opacity: parseFloat(charInfo.headOverlay[2].opacity),
                                colorType: parseInt(charInfo.headOverlay[2].colorType),
                                colorIndex: parseInt(charInfo.headOverlay[2].colorIndex),
                            },
                            {
                                index: parseInt(charInfo.headOverlay[3].index),
                                opacity: parseFloat(charInfo.headOverlay[3].opacity),
                                colorType: parseInt(charInfo.headOverlay[3].colorType),
                                colorIndex: parseInt(charInfo.headOverlay[3].colorIndex),
                            },
                            {
                                index: parseInt(charInfo.headOverlay[4].index),
                                opacity: parseFloat(charInfo.headOverlay[4].opacity),
                                colorType: parseInt(charInfo.headOverlay[4].colorType),
                                colorIndex: parseInt(charInfo.headOverlay[4].colorIndex),
                            },
                            {
                                index: parseInt(charInfo.headOverlay[5].index),
                                opacity: parseFloat(charInfo.headOverlay[5].opacity),
                                colorType: parseInt(charInfo.headOverlay[5].colorType),
                                colorIndex: parseInt(charInfo.headOverlay[5].colorIndex),
                            },
                            {
                                index: parseInt(charInfo.headOverlay[6].index),
                                opacity: parseFloat(charInfo.headOverlay[6].opacity),
                                colorType: parseInt(charInfo.headOverlay[6].colorType),
                                colorIndex: parseInt(charInfo.headOverlay[6].colorIndex),
                            },
                            {
                                index: parseInt(charInfo.headOverlay[7].index),
                                opacity: parseFloat(charInfo.headOverlay[7].opacity),
                                colorType: parseInt(charInfo.headOverlay[7].colorType),
                                colorIndex: parseInt(charInfo.headOverlay[7].colorIndex),
                            },
                            {
                                index: parseInt(charInfo.headOverlay[8].index),
                                opacity: parseFloat(charInfo.headOverlay[8].opacity),
                                colorType: parseInt(charInfo.headOverlay[8].colorType),
                                colorIndex: parseInt(charInfo.headOverlay[8].colorIndex),
                            },
                            {
                                index: parseInt(charInfo.headOverlay[9].index),
                                opacity: parseFloat(charInfo.headOverlay[9].opacity),
                                colorType: parseInt(charInfo.headOverlay[9].colorType),
                                colorIndex: parseInt(charInfo.headOverlay[9].colorIndex),
                            },
                            {
                                index: parseInt(charInfo.headOverlay[10].index),
                                opacity: parseFloat(charInfo.headOverlay[10].opacity),
                                colorType: parseInt(charInfo.headOverlay[10].colorType),
                                colorIndex: parseInt(charInfo.headOverlay[10].colorIndex),
                            },
                            {
                                index: parseInt(charInfo.headOverlay[11].index),
                                opacity: parseFloat(charInfo.headOverlay[11].opacity),
                                colorType: parseInt(charInfo.headOverlay[11].colorType),
                                colorIndex: parseInt(charInfo.headOverlay[11].colorIndex),
                            },
                            {
                                index: parseInt(charInfo.headOverlay[12].index),
                                opacity: parseFloat(charInfo.headOverlay[12].opacity),
                                colorType: parseInt(charInfo.headOverlay[12].colorType),
                                colorIndex: parseInt(charInfo.headOverlay[12].colorIndex),
                            },
                        ],
                        eyeColor: parseInt(charInfo.eyeColor),
                        hairColor: {
                            colorId: parseInt(charInfo.hairColor.colorId),
                            highlightColorId: parseInt(charInfo.hairColor.highlightColorId)
                        }
                    },
                    characterClothing: {
                        clothes: [
                            {
                                component: 0,
                                drawable: charInfo.clothes[0].drawable,
                                texture: charInfo.clothes[0].texture
                            },
                            {
                                component: 1,
                                drawable: charInfo.clothes[1].drawable,
                                texture: charInfo.clothes[1].texture
                            },
                            {
                                component: 2,
                                drawable: charInfo.clothes[2].drawable,
                                texture: charInfo.clothes[2].texture
                            },
                            {
                                component: 3,
                                drawable: charInfo.clothes[3].drawable,
                                texture: charInfo.clothes[3].texture
                            },
                            {
                                component: 4,
                                drawable: charInfo.clothes[4].drawable,
                                texture: charInfo.clothes[4].texture
                            },
                            {
                                component: 5,
                                drawable: charInfo.clothes[5].drawable,
                                texture: charInfo.clothes[5].texture
                            },
                            {
                                component: 6,
                                drawable: charInfo.clothes[6].drawable,
                                texture: charInfo.clothes[6].texture
                            },
                            {
                                component: 7,
                                drawable: charInfo.clothes[7].drawable,
                                texture: charInfo.clothes[7].texture
                            },
                            {
                                component: 8,
                                drawable: charInfo.clothes[8].drawable,
                                texture: charInfo.clothes[8].texture
                            },
                            {
                                component: 9,
                                drawable: charInfo.clothes[9].drawable,
                                texture: charInfo.clothes[9].texture
                            },
                            {
                                component: 10,
                                drawable: charInfo.clothes[10].drawable,
                                texture: charInfo.clothes[10].texture
                            },
                            {
                                component: 11,
                                drawable: charInfo.clothes[11].drawable,
                                texture: charInfo.clothes[11].texture
                            },
                        ],
                        props: [
                            {
                                component: 0,
                                drawable: charInfo.props[0].drawable,
                                texture: charInfo.props[0].texture
                            },
                            {
                                component: 1,
                                drawable: charInfo.props[1].drawable,
                                texture: charInfo.props[1].texture
                            },
                            {
                                component: 2,
                                drawable: charInfo.props[2].drawable,
                                texture: charInfo.props[2].texture
                            },
                            {
                                component: 6,
                                drawable: charInfo.props[3].drawable,
                                texture: charInfo.props[3].texture
                            },
                            {
                                component: 7,
                                drawable: charInfo.props[4].drawable,
                                texture: charInfo.props[4].texture
                            },
                        ]
                    },
                    money: {
                        hand: 0,
                        bank: 0,
                    },
                    hunger: 100,
                    thirst: 100,
                },
            ],
        },
        'accounts'
    );
}

alt.onClient(SYSTEM_EVENTS.CHAR_CREATOR_FINISH_CHAR, finishChar);
