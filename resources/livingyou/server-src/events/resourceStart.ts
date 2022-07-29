import * as alt from 'alt-server';
import Database from '@stuyk/ezmongodb';
import * as build_options from '../../../../build-options';
import Items from '../systems/items';
import DroppedItems from '../systems/droppedItems';
import { On } from '../systems/eventSystem/on';
import Vehicles from '../systems/vehicles';

const url = process.env.MONGO_URL;
const dbName = 'livingyou';
const collections = ['accounts', 'items', 'vehicles', 'droppedItems'];

export default class ServerStart {
    @On('resourceStart')
    static async resourceStart(errored: boolean): Promise<void> {
        if (build_options.default.testMode) return;
        const connected: boolean = await Database.init(url, dbName, collections);
        if (!connected) {
            throw new Error(`Did not connect to the database.`);
        }
        await Items.fetchItems();
        await Vehicles.fetchVehicles();
        await DroppedItems.setupDroppedItems();
        alt.log('~lk~[~y~LivingYou~lk~] ~b~Loaded LivingYou~w~');
    }

    @On('serverStarted')
    static serverStarted(): void {
        if (build_options.default.testMode) alt.stopServer();
    }
}
