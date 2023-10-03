import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';
import { DBCollections } from '../../shared/enums/dbCollections';
import IAccount from '../interface/IAccount';
import { EmitClient } from './eventSystem/emit';
import { OnClient } from './eventSystem/on';

export default class Auth {
    @OnClient('connection:Begin')
    static async startLogin(player: alt.Player): Promise<void> {
        if (!player || !player.valid) {
            return;
        }

        if (player.name.toLowerCase() == 'player') {
            player.kick('Bitte ändere deinen Nutzernamen!');
        }

        player.dimension = player.id + 1;
        player.setPosition(-453.586, 276.909, 78.515);
        player.visible = false;
        player.frozen = true;
        player.collision = false;
        player.time();
        player.weather();

        EmitClient(player, 'webView:Info', 'http://assets/webviews/index.html');

        let cloudId: string;

        try {
            cloudId = await player.requestCloudID()
        } catch(e) {
            alt.log('CloudAuth Error: ' + e);
            player.kick('CloudAuth Error: ' + e);
            return;
        }

        let findAccount = await Database.fetchAllByField<IAccount>('cloudId', cloudId, 'accounts');
        if (findAccount.length <= 0) {
            const insertedData: IAccount = await Database.insertData<IAccount>(
                {
                    cloudId: cloudId,
                    firstJoinTimestamp: new Date().getTime(),
                    lastJoinTimestamp: new Date().getTime(),
                    allowSecondCharacter: false,
                    character: [],
                    banned: false,
                },
                DBCollections.ACCOUNTS,
                true
            );
            if (insertedData.cloudId != cloudId) return;
            findAccount = [];
            findAccount.push(insertedData);
        }
        await Database.updatePartialData(findAccount[0]._id, { lastJoinTimestamp: new Date().getTime() }, DBCollections.ACCOUNTS);
        
        player.cloudId = cloudId;
        EmitClient(player, 'charSelector:Open', findAccount[0].character, findAccount[0].allowSecondCharacter);
    }
}
