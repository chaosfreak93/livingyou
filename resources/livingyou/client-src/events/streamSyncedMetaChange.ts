import * as alt from 'alt-client';
import * as native from 'natives';
import { On } from '../systems/eventSystem/on';

export default class StreamSyncedMetaChange {
    @On('streamSyncedMetaChange')
    static async streamSyncedMetaChange(entity: alt.Entity, key: string, value: any, oldValue: any): Promise<void> {
        if (entity instanceof alt.Vehicle) {
            await alt.Utils.waitFor(() => entity.isSpawned && entity.valid, 500);
            switch (key) {
                case 'fuelLevel':
                    entity.fuelLevel = value;
                    break;
                case 'oilLevel':
                    entity.oilLevel = value;
                    break;
                case 'lockState':
                    if (value === 2) {
                        entity.indicatorLights = 8;
                        await alt.Utils.wait(1000);
                        entity.indicatorLights = null;
                    } else if (value === 1) {
                        entity.indicatorLights = 8;
                        await alt.Utils.wait(250);
                        entity.indicatorLights = null;
                        await alt.Utils.wait(250);
                        entity.indicatorLights = 8;
                        await alt.Utils.wait(250);
                        entity.indicatorLights = null;
                    }
                    break;
            }
        } else if (entity instanceof alt.Player) {
            await alt.Utils.waitFor(() => entity.isSpawned && entity.valid, 500);
        }
    }
}
