import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';
import { DBCollections } from '../../shared/enums/dbCollections';
import IGasPump from '../../shared/interface/IGasPump';

export default class GasPumps {
    static gasPumps: IGasPump[] = [];

    static nearestGasPump(sourceEntity: alt.Entity): { gasPump: IGasPump; distance: number } {
        let distance: number;
        let gasPump: IGasPump;
        for (let i = 0; i < GasPumps.gasPumps.length; i++) {
            let gasPumpPos: alt.Vector3 = GasPumps.gasPumps[i].position;
            let newDistance: number = sourceEntity.pos.distanceTo(gasPumpPos);
            if (distance == undefined || distance >= newDistance) {
                distance = newDistance;
                gasPump = GasPumps.gasPumps[i];
            }
        }
        return { gasPump, distance };
    }

    static async fetchGasPumps(): Promise<void> {
        GasPumps.gasPumps = await Database.fetchAllData<IGasPump>(DBCollections.GAS_PUMPS);
        alt.log(`~lk~[~y~LivingYou~lk~] ~b~GasPumps - ${GasPumps.gasPumps.length}~w~`);
    }
}
