import * as alt from 'alt-client';
import { On } from '../systems/eventSystem/on';

export default class StreamSyncedMetaChange {
    @On('streamSyncedMetaChange')
    static async streamSyncedMetaChange(entity: alt.Entity, key: string, value: any, oldValue: any) {
        if (entity instanceof alt.Vehicle) {
            await alt.Utils.waitFor(() => entity.isSpawned && entity.valid, 500);
            switch (key) {
                case 'fuelLevel':
                    entity.fuelLevel = value;
                    break;
                case 'oilLevel':
                    entity.oilLevel = value;
                    break;
            }
        } else if (entity instanceof alt.Player) {
            await alt.Utils.waitFor(() => entity.isSpawned && entity.valid, 500);
        }
    }
}
