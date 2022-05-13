import * as alt from 'alt-server';
import Database from '@stuyk/ezmongodb';

const url = process.env.MONGO_URL;
const dbName = 'livingyou';
const collections = ['accounts'];

alt.on('resourceStart', async (errored: boolean) => {
    // @ts-ignore
    const connected = await Database.init(url, dbName, collections);
    if (!connected) {
        throw new Error(`Did not connect to the database.`);
    }
});
