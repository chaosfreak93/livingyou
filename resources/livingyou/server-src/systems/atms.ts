import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';
import { DBCollections } from '../../shared/enums/dbCollections';
import IAtm from '../../shared/interface/IAtm';

export default class ATMs {
    static atms: IAtm[] = [];

    static nearestAtm(sourceEntity: alt.Entity): { gasPump: IAtm; distance: number } {
        let distance: number;
        let gasPump: IAtm;
        for (let i = 0; i < ATMs.atms.length; i++) {
            let gasPumpPos: alt.Vector3 = ATMs.atms[i].position;
            let newDistance: number = sourceEntity.pos.distanceTo(gasPumpPos);
            if (distance == undefined || distance >= newDistance) {
                distance = newDistance;
                gasPump = ATMs.atms[i];
            }
        }
        return { gasPump, distance };
    }

    static async fetchATMs(): Promise<void> {
        ATMs.atms = await Database.fetchAllData<IAtm>(DBCollections.ATMS);
        for (let i = 0; i < ATMs.atms.length; i++) {
            let atmBlip = new alt.PointBlip(ATMs.atms[i].position.x, ATMs.atms[i].position.y, ATMs.atms[i].position.z, true);
            atmBlip.name = 'ATM';
            atmBlip.sprite = 108;
            atmBlip.color = 2;
            atmBlip.shortRange = true;
        }
        alt.log(`~lk~[~y~LivingYou~lk~] ~b~ATMs - ${ATMs.atms.length}~w~`);
    }
}
