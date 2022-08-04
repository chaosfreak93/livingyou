import * as alt from 'alt-server';
import Database from '@stuyk/ezmongodb';
import IAccount from '../interface/IAccount';
import ICharacter from '../../shared/interface/ICharacter';
import { ObjectID } from 'bson';
import { OnClient } from './eventSystem/on';
import { EmitClient } from './eventSystem/emit';
import ICharacterClothe from '../../shared/interface/ICharacterClothe';
import ICharacterProp from '../../shared/interface/ICharacterProp';

export default class CharCreator {
    @OnClient('charCreator:FinishChar')
    static async finishChar(player: alt.Player, character: any) {
        character = JSON.parse(character) as ICharacter;
        for (let i = 0; i < character.characterClothing.clothes.length; i++) {
            let clothe: ICharacterClothe = character.characterClothing.clothes[i];
            player.setClothes(clothe.component, clothe.drawable, clothe.texture);
            let dlcClothe = player.getDlcClothes(clothe.component);
            character.characterClothing.clothes[i].dlc = dlcClothe.dlc;
            character.characterClothing.clothes[i].drawable = dlcClothe.drawable;
            character.characterClothing.clothes[i].texture = dlcClothe.texture;
            character.characterClothing.clothes[i].palette = dlcClothe.palette;
        }
        for (let i = 0; i < character.characterClothing.props.length; i++) {
            let prop: ICharacterProp = character.characterClothing.props[i];
            if (prop.drawable === -1) {
                player.clearProp(prop.component);
                let dlcProp = player.getDlcProp(prop.component);
                character.characterClothing.props[i].dlc = dlcProp.dlc;
                character.characterClothing.props[i].drawable = dlcProp.drawable;
                character.characterClothing.props[i].texture = dlcProp.texture;
            } else {
                player.setProp(prop.component, prop.drawable, prop.texture);
                let dlcProp = player.getDlcProp(prop.component);
                character.characterClothing.props[i].dlc = dlcProp.dlc;
                character.characterClothing.props[i].drawable = dlcProp.drawable;
                character.characterClothing.props[i].texture = dlcProp.texture;
            }
        }
        character.id = new ObjectID().toString();
        character.alive = true;
        character.money = {
            hand: 0,
            bank: 0,
        };
        character.hunger = 100;
        character.thirst = 100;
        character.pocketInventory = {
            maxWeight: 10,
            currentWeight: 0,
            items: [
                {
                    id: '62bc49232a7e6946bc29d8d3',
                    amount: 6,
                },
                {
                    id: '62b439263cd1640f71307efd',
                    amount: 12,
                },
            ],
        };

        let findAccount = await Database.fetchAllByField<IAccount>('discord', player.discordId, 'accounts');
        if (findAccount.length <= 0) return;
        findAccount[0].character.push(character);

        await Database.updatePartialData(findAccount[0]._id, { ...findAccount[0] }, 'accounts');

        EmitClient(player, 'charCreator:Close');
        await alt.Utils.wait(500);
        EmitClient(player, 'charSelector:Open', findAccount[0].character, findAccount[0].allowSecondCharacter);
    }
}
