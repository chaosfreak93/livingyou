import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';
import axios from 'axios';
import { OnServer } from '../../client-src/systems/eventSystem/on';
import IAccount from '../interface/IAccount';
import IDiscordData from '../interface/IDiscordData';
import { EmitClient } from './eventSystem/emit';

export default class DiscordAuth {
    @OnServer('connection:Begin')
    static startLogin(player: alt.Player) {
        if (!player || !player.valid) {
            return;
        }

        if (player.name.toLowerCase() == 'player') {
            player.kick('Bitte ändere deinen Nutzernamen!');
        }

        player.dimension = player.id + 1;
        player.setPosition(player, -1645.55, -1113.04, 13);
        player.visible = false;
        //player.frozen = true;
        player.collision = false;
        player.time(player);
        player.weather(player);

        EmitClient(player, 'webView:Info', 'http://assets/webviews/index.html');
        EmitClient(player, 'discord:Open');
    }

    @OnServer('discord:ProceedToken')
    static async proceedDiscordToken(player: alt.Player, token: string): Promise<void> {
        const request = await axios
            .get('https://discordapp.com/api/users/@me', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                },
            })
            .catch((err) => {
                alt.logError(err);
                return null;
            });

        if (!request || !request.data || !request.data.id || !request.data.email) {
            player.kick('Authorization failed');
            return;
        }

        await DiscordAuth.finishLogin(player, request.data);
    }

    @OnServer('discord:FinishAuth')
    static async finishLogin(player: alt.Player, discordData: IDiscordData): Promise<void> {
        let findAccount = await Database.fetchAllByField<IAccount>('discord', discordData.id, 'accounts');
        if (findAccount.length <= 0) {
            const insertedData = await Database.insertData<IAccount>(
                {
                    discord: discordData.id,
                    email: discordData.email,
                    firstJoinTimestamp: new Date().getTime(),
                    lastJoinTimestamp: new Date().getTime(),
                    allowSecondCharacter: false,
                    character: [],
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
        player.discordId = discordData.id;
        EmitClient(player, 'discord:Close');
        await alt.Utils.wait(500);
        EmitClient(
            player,
            'charSelector:Open',
            findAccount[0].character,
            findAccount[0].allowSecondCharacter
        );
    }
}
