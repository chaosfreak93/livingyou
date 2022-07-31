import * as alt from 'alt-server';
import Database from '@stuyk/ezmongodb';
import IAccount from '../interface/IAccount';
import ICharacter from '../../shared/interface/ICharacter';
import { ObjectID } from 'bson';
import { OnClient } from './eventSystem/on';
import { EmitClient } from './eventSystem/emit';
import { DBCollections } from '../../shared/enums/dbCollections';

export default class CharCreator {
    @OnClient('charCreator:FinishChar')
    static async finishChar(player: alt.Player, character: any): Promise<void> {
        character = JSON.parse(character) as ICharacter;
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

        let findAccount: IAccount[] = await Database.fetchAllByField<IAccount>(
            'discord',
            player.discordId,
            DBCollections.ACCOUNTS
        );
        if (findAccount.length <= 0) return;
        findAccount[0].character.push(character);

        await Database.updatePartialData(findAccount[0]._id, { ...findAccount[0] }, DBCollections.ACCOUNTS);

        EmitClient(player, 'charCreator:Close');
        await alt.Utils.wait(500);
        EmitClient(player, 'charSelector:Open', findAccount[0].character, findAccount[0].allowSecondCharacter);
    }
}
