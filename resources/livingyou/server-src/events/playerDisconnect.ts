import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';
import IAccount from '../interface/IAccount';

alt.on('playerDisconnect', playerDisconnect);

async function playerDisconnect(player: alt.Player, reason: string) {
    if (!player || !player.valid || !player.discordId || !player.character) return;
    const pC = player.character;
    const pDI = player.discordId;

    let findAccount = await Database.fetchAllByField<IAccount>('discord', pDI, 'accounts');
    if (findAccount.length <= 0) return;

    const char = findAccount[0].character.find((char) => char.id == pC.id);
    char.lastKnownLocation = pC.lastKnownLocation;
    await Database.updatePartialData(findAccount[0]._id, { ...findAccount[0] }, 'accounts');
}
