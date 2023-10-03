import * as alt from 'alt-server';
import * as xsync from 'altv-xsync-entity-server';

alt.log('~lk~[~y~LivingYou~lk~] ~b~Loading LivingYou...~w~');
export default new xsync.XSyncEntity({
    streamDelay: 200,
    wss: {
        port: 19132,
        localhost: true,
    },
    customClientInit: true,
});
