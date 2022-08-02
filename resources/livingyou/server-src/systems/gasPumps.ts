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
                this.gasPumps[i].position.x,
                this.gasPumps[i].position.y,
                this.gasPumps[i].position.z
            );
            let name: string = 'Zapfsäule - ';
            if (this.gasPumps[i].fuelType.diesel) {
                name += 'Diesel';
                gasPumpBlip.color = 17;
            }
            if (this.gasPumps[i].fuelType.benzin) name += ', Benzin';
            if (this.gasPumps[i].fuelType.eletric) {
                name += 'Strom';
                gasPumpBlip.color = 5;
            }
            if (this.gasPumps[i].fuelType.cerosin) name += 'Kerosin';
            if (this.gasPumps[i].fuelType.air) {
                name += 'Luft';
                gasPumpBlip.color = 3;
            }
            if (this.gasPumps[i].fuelType.water) name += ', Wasser';
            gasPumpBlip.name = name;
            gasPumpBlip.sprite = 361;
        }
        alt.log(`~lk~[~y~LivingYou~lk~] ~b~GasPumps - ${GasPumps.gasPumps.length}~w~`);
    }
}
