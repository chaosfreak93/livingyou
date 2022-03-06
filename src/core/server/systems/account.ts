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

    if (!findAccount[0].characterData) {
        alt.emitClient(player, 'triggerCharCreator');
    }

    player.spawn(findAccount[0].characterData ? findAccount[0].characterData.lastKnownLocation.position : new alt.Vector3(-75.2920, -819.1181, 327));
    player.rot = findAccount[0].characterData ? findAccount[0].characterData.lastKnownLocation.rotation : new alt.Vector3(0, 0, 0);

    //let vehicle = new alt.Vehicle('buzzard', -75.2290, -820, 326.1751, 0, 0, 0);
    //player.setIntoVehicle(vehicle, 1);

    alt.emitClient(player, 'exitLogin');
});