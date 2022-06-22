import * as alt from 'alt-server';
import Database from '@stuyk/ezmongodb';
import * as build_options from '../../../../build-options';
import Items from '../prototype/items';
import IItem from '../../shared/interface/IItem';

const url = process.env.MONGO_URL;
const dbName = 'livingyou';
const collections = ['accounts', 'items'];

alt.on('resourceStart', async (errored: boolean) => {
    if (build_options.default.testMode) return;
    const connected = await Database.init(url, dbName, collections);
    if (!connected) {
        throw new Error(`Did not connect to the database.`);
    }
    await Items.fetchItems();
});

alt.on('serverStarted', () => {
    if (build_options.default.testMode) alt.stopServer();
});
