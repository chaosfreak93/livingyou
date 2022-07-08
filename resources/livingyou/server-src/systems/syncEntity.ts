import * as xsync from 'altv-xsync-entity-server';

export default new xsync.XSyncEntity({
    streamDelay: 200,
    wss: {
        port: 19132,
        localhost: true,
    },
    customClientInit: true,
});
