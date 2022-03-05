import * as alt from 'alt-server';
import { autoReconnect } from '../utility/reconnect';

alt.on('resourceStart', async (errored: boolean) => {

    //Bottom Code Line
    if (!errored && alt.debug) await autoReconnect();
});