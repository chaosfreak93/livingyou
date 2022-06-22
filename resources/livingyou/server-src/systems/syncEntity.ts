import * as xsync from 'altv-xsync-entity-server';

new xsync.XSyncEntity({
    streamDelay: 100,
    wss: {
        port: 19132,
        localhost: true,
    },
});
