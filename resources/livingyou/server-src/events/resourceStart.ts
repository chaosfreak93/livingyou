import * as alt from 'alt-server';
import Database from '@stuyk/ezmongodb';
import * as build_options from '../../../../build-options';

const url = process.env.MONGO_URL;
const dbName = 'livingyou';
const collections = ['accounts', 'items', 'vehicles'];

alt.on('resourceStart', async (errored: boolean) => {
    if (build_options.default.testMode) return;
    const connected = await Database.init(url, dbName, collections);
    if (!connected) {
        throw new Error(`Did not connect to the database.`);
    }
});

alt.on('serverStarted', () => {
    if (build_options.default.testMode) alt.stopServer();
});
