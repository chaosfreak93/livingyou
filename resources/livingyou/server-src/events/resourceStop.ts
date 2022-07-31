import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';
import { DBCollections } from '../../shared/enums/dbCollections';
import ICharacter from '../../shared/interface/ICharacter';
import IDroppedItem from '../../shared/interface/IDroppedItem';
import IAccount from '../interface/IAccount';
import DroppedItems from '../systems/droppedItems';
import { On } from '../systems/eventSystem/on';

export default class ServerStop {
    @On('resourceStop')
    static async resourceStop() {
        alt.log('~lk~[~y~LivingYou~lk~] ~b~Stopping LivingYou...~w~');
        alt.log('~lk~[~y~LivingYou~lk~] ~b~Saving Player Data...~w~');
        const pC: ICharacter[] = [];
        const pDI: number[] = [];

        let allPlayer: readonly alt.Player[] = alt.Player.all;
        for (let i = 0; i < allPlayer.length; i++) {
            let player: alt.Player = allPlayer[i];
            if (!player || !player.valid || !player.discordId || !player.character) return;
            pC.push(player.character);
            pDI.push(player.discordId);
        }

        for (let i = 0; i < pDI.length; i++) {
            let findAccount: IAccount[] = await Database.fetchAllByField<IAccount>(
                'discord',
                pDI[i],
                DBCollections.ACCOUNTS
            );
            if (findAccount.length <= 0) return;

            const char: ICharacter = findAccount[0].character.find((char) => char.id == pC[i].id);
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
            await Database.updatePartialData(findAccount[0]._id, { ...findAccount[0] }, DBCollections.ACCOUNTS);
        }
        alt.log('~lk~[~y~LivingYou~lk~] ~b~Player Data Saved~w~');

        alt.log('~lk~[~y~LivingYou~lk~] ~b~Saving DroppedItems...~w~');
        await Database.dropCollection(DBCollections.DROPPED_ITEMS);
        await Database.createCollection(DBCollections.DROPPED_ITEMS);
        const droppedItems: IDroppedItem[] = DroppedItems.droppedItems;
        for (let i = 0; i < droppedItems.length; i++) {
            await Database.insertData<IDroppedItem>(droppedItems[i], DBCollections.DROPPED_ITEMS, false);
        }
        alt.log('~lk~[~y~LivingYou~lk~] ~b~DroppedItems saved~w~');
        alt.log('~lk~[~y~LivingYou~lk~] ~b~Stopped LivingYou~w~');
    }
}
