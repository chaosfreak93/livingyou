import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';
import ICharacter from '../../shared/interface/ICharacter';
import IAccount from '../interface/IAccount';

alt.on('resourceStop', resourceStop);

async function resourceStop() {
    const pC: ICharacter[] = [];
    const pDI: number[] = [];

    let allPlayer = alt.Player.all;
    for (let i = 0; i < allPlayer.length; i++) {
        let player = allPlayer[i];
        if (!player || !player.valid || !player.discordId || !player.character) return;
        pC.push(player.character);
        pDI.push(player.discordId);
    }

    for (let i = 0; i < pDI.length; i++) {
        let findAccount = await Database.fetchAllByField<IAccount>('discord', pDI[i], 'accounts');
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
}
