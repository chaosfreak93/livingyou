import * as alt from 'alt-server';
import Database from '@stuyk/ezmongodb';
import IAccount from '../interface/IAccount';
import IDiscordData from '../interface/IDiscordData';

alt.on('authFinished', async (player: alt.Player, discordData: IDiscordData) => {
    //player.model = 'mp_m_freemode_01';
    //player.spawn(new alt.Vector3(-527.6835327148438, -678.7252807617188, 33.6607666015625), 50);
    let findAccount = await Database.fetchAllByField<IAccount>('discord', discordData.id, 'accounts');
    if (findAccount.length <= 0) {
        const insertedData = await Database.insertData<IAccount>({ discord: discordData.id, email: discordData.email, firstJoinTimestamp: new Date().getTime(), lastJoinTimestamp: new Date().getTime(), banned: false, }, 'accounts', true);
        if (insertedData.discord != discordData.id) return;
        findAccount = [];
        findAccount.push(insertedData);
    }

    alt.emitClient(player, 'showCharSelector', findAccount[0].character);
});