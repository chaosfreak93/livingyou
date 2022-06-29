import * as alt from 'alt-server';
import Database from '@stuyk/ezmongodb';
import * as build_options from '../../../../build-options';
import Items from '../systems/items';
import DroppedItems from '../systems/droppedItems';
import { On } from '../systems/eventSystem/on';

const url = process.env.MONGO_URL;
const dbName = 'livingyou';
const collections = ['accounts', 'items', 'vehicles', 'droppedItems'];

export default class ServerStart {
    @On('resourceStart')
    static async resourceStart(errored: boolean) {
        if (build_options.default.testMode) return;
        const connected = await Database.init(url, dbName, collections);
        if (!connected) {
            throw new Error(`Did not connect to the database.`);
        }
        await Items.fetchItems();
        await DroppedItems.setupDroppedItems();
    }

    @On('serverStarted')
    static serverStarted() {
        if (build_options.default.testMode) alt.stopServer();
    }
}
