import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';
import ICharacter from '../../shared/interface/ICharacter';
import IDroppedItem from '../../shared/interface/IDroppedItem';
import IAccount from '../interface/IAccount';
import DroppedItems from '../systems/droppedItems';
import { On } from '../systems/eventSystem/on';

export default class ServerStop {
    @On('resourceStop')
    static async resourceStop() {
        const pC: ICharacter[] = [];
        const pCI: string[] = [];

        let allPlayer = alt.Player.all;
        for (let i = 0; i < allPlayer.length; i++) {
            let player = allPlayer[i];
            if (!player || !player.valid || !player.cloudId || !player.character) return;
            pC.push(player.character);
            pCI.push(player.cloudId);
        }

        for (let i = 0; i < pCI.length; i++) {
            let findAccount = await Database.fetchAllByField<IAccount>('cloudId', pCI[i], 'accounts');
            if (findAccount.length <= 0) return;

            const char = findAccount[0].character.find((char) => char.id == pC[i].id);
            char.alive = pC[i].alive;
            char.characterAppearence = pC[i].characterAppearence;
            char.characterClothing = pC[i].characterClothing;
            if (pC[i].phoneNumber) {
                char.phoneNumber = pC[i].phoneNumber;
            }
            char.money = pC[i].money;
            char.hunger = pC[i].hunger;
            char.thirst = pC[i].thirst;
            char.lastKnownLocation = pC[i].lastKnownLocation;
            char.pocketInventory = pC[i].pocketInventory;
            if (pC[i].backpackInventory) {
                char.backpackInventory = pC[i].backpackInventory;
            }
            await Database.updatePartialData(findAccount[0]._id, { ...findAccount[0] }, 'accounts');
        }

        await Database.dropCollection('droppedItems');
        await Database.createCollection('droppedItems');
        const droppedItems = DroppedItems.droppedItems;
        for (let i = 0; i < droppedItems.length; i++) {
            await Database.insertData<IDroppedItem>(droppedItems[i], 'droppedItems', false);
        }
    }
}
