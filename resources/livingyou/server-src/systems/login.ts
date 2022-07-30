import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';
import IAccount from '../interface/IAccount';
import IDiscordData from '../interface/IDiscordData';
import { EmitClient } from './eventSystem/emit';
import { OnClient } from './eventSystem/on';

export default class DiscordAuth {
    @OnClient('connection:Begin')
    static startLogin(player: alt.Player): void {
        if (!player || !player.valid) {
            return;
        }

        if (player.name.toLowerCase() == 'player') {
            player.kick('Bitte ändere deinen Nutzernamen!');
        }

        player.dimension = player.id + 1;
        player.setPosition(-1645.55, -1113.04, 13);
        player.visible = false;
        player.frozen = true;
        player.collision = false;
        player.time();
        player.weather();

        EmitClient(player, 'webView:Info', 'http://assets/webviews/index.html');
        EmitClient(player, 'discord:Open');
    }

    @OnClient('discord:ProceedToken')
    static async proceedDiscordToken(player: alt.Player, token: string): Promise<void> {
        const res = await fetch('https://discordapp.com/api/users/@me', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) {
            EmitClient(player, 'discord:ObtainToken', true);
            return;
        }

        const data = await res.json();

        if (!data || !data.id || !data.username || !data.discriminator) {
            player.kick('Authorization failed');
            return;
        }

        await DiscordAuth.finishLogin(player, data);
    }

    static async finishLogin(player: alt.Player, discordData: IDiscordData): Promise<void> {
        let findAccount: IAccount[] = await Database.fetchAllByField<IAccount>('discord', discordData.id, 'accounts');
        if (findAccount.length <= 0) {
            const insertedData: IAccount = await Database.insertData<IAccount>(
                {
                    discord: discordData.id,
                    username: discordData.username + '#' + discordData.discriminator,
                    firstJoinTimestamp: new Date().getTime(),
                    lastJoinTimestamp: new Date().getTime(),
                    allowSecondCharacter: false,
                    character: [],
                    banned: false,
                },
                'accounts',
                true
            );
            if (insertedData.discord !== discordData.id) return;
            findAccount = [];
            findAccount.push(insertedData);
        }
        await Database.updatePartialData(findAccount[0]._id, { lastJoinTimestamp: new Date().getTime() }, 'accounts');

        player.setPosition(-453.586, 276.909, 78.515);
        player.discordId = discordData.id;
        EmitClient(player, 'discord:Close');
        await alt.Utils.wait(500);
        EmitClient(player, 'charSelector:Open', findAccount[0].character, findAccount[0].allowSecondCharacter);
    }
}
