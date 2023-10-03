import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';
import IAccount from '../interface/IAccount';
import { On } from '../systems/eventSystem/on';

export default class PlayerDisconnect {
    @On('playerDisconnect')
    static async playerDisconnect(player: alt.Player, reason: string) {
        if (!player || !player.valid || !player.cloudId || !player.character) return;
        const pC = player.character;
        const pCI = player.cloudId;

        let findAccount = await Database.fetchAllByField<IAccount>('cloudId', pCI, 'accounts');
        if (findAccount.length <= 0) return;

        const char = findAccount[0].character.find((char) => char.id == pC.id);
        char.alive = pC.alive;
        char.characterAppearence = pC.characterAppearence;
        char.characterClothing = pC.characterClothing;
        if (pC.phoneNumber) {
            char.phoneNumber = pC.phoneNumber;
        }
        char.money = pC.money;
        char.hunger = pC.hunger;
        char.thirst = pC.thirst;
        char.lastKnownLocation = pC.lastKnownLocation;
        char.pocketInventory = pC.pocketInventory;
        if (pC.backpackInventory) {
            char.backpackInventory = pC.backpackInventory;
        }
        await Database.updatePartialData(findAccount[0]._id, { ...findAccount[0] }, 'accounts');
    }
}
