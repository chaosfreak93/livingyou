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
        for (let i = 0; i < GasPumps.gasPumps.length; i++) {
            let gasPumpBlip = new alt.PointBlip(
                GasPumps.gasPumps[i].position.x,
                GasPumps.gasPumps[i].position.y,
                GasPumps.gasPumps[i].position.z
            );
            let name: string = 'Zapfsäule - ';
            if (GasPumps.gasPumps[i].fuelType.diesel) {
                name += 'Diesel';
                gasPumpBlip.color = 17;
            }
            if (GasPumps.gasPumps[i].fuelType.benzin) name += ', Benzin';
            if (GasPumps.gasPumps[i].fuelType.eletric) {
                name += 'Strom';
                gasPumpBlip.color = 5;
            }
            if (GasPumps.gasPumps[i].fuelType.cerosin) name += 'Kerosin';
            if (GasPumps.gasPumps[i].fuelType.air) {
                name += 'Luft';
                gasPumpBlip.color = 3;
            }
            if (GasPumps.gasPumps[i].fuelType.water) name += ', Wasser';
            gasPumpBlip.name = name;
            gasPumpBlip.sprite = 361;
            gasPumpBlip.shortRange = true;
        }
        alt.log(`~lk~[~y~LivingYou~lk~] ~b~GasPumps - ${GasPumps.gasPumps.length}~w~`);
    }
}
