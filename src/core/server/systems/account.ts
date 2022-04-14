import * as alt from 'alt-server';
import Database from '@stuyk/ezmongodb';
import IAccount from '../interface/IAccount';
import IDiscordData from '../interface/IDiscordData';
import { SYSTEM_EVENTS } from '../../shared/enums/system';

alt.on(SYSTEM_EVENTS.DISCORD_FINISH_AUTH, authFinished);

async function authFinished(player: alt.Player, discordData: IDiscordData): Promise<void> {
    let findAccount = await Database.fetchAllByField<IAccount>('discord', discordData.id, 'accounts');
    if (findAccount.length <= 0) {
        const insertedData = await Database.insertData<IAccount>(
            {
                discord: discordData.id,
                email: discordData.email,
                firstJoinTimestamp: new Date().getTime(),
                lastJoinTimestamp: new Date().getTime(),
                allowSecondCharacter: false,
                banned: false,
            },
            'accounts',
            true
        );
        if (insertedData.discord != discordData.id) return;
        findAccount = [];
        findAccount.push(insertedData);
    }
    await Database.updatePartialData(findAccount[0]._id, { lastJoinTimestamp: new Date().getTime() }, 'accounts');

    player.setPosition(player, -453.586, 276.909, 78.515);
}
