import * as alt from 'alt-server';
import * as xsync from 'altv-xsync-entity-server';
import ICableCarData from '../../shared/interface/ICableCarData';
import { EntityPools } from '../../shared/enums/entityPools';
import cableCarRoute from '../../shared/data/cableCar';

const cableCarPool = new xsync.EntityPool(EntityPools.CableCar, { maxStreamedIn: 3 });

class CableCar extends xsync.Entity<ICableCarData> {
    constructor(
        pos: alt.IVector3,
        heading: number,
        id: number,
        progress: number,
        animation: string,
        direction: 'Up' | 'Down'
    ) {
        super(cableCarPool, pos, { id, heading, progress, animation, direction }, {}, 0, 3000);
    }
}

const cableCar1 = new CableCar(
    cableCarRoute[0][0],
    -getHeadingFromVector2d(cableCarRoute[0][1], cableCarRoute[0][0], true),
    0,
    0,
    '',
    'Up'
);

const cableCar2 = new CableCar(
    cableCarRoute[1][0],
    getHeadingFromVector2d(cableCarRoute[1][0], cableCarRoute[1][1], true),
    1,
    0,
    '',
    'Down'
);

alt.setInterval(() => {
    if (cableCar1.syncedMeta.direction == 'Up') {
        if (cableCar1.syncedMeta.progress >= 13) {
            cableCar1.setSyncedMeta({ direction: 'Down' });
        } else {
            cableCar1.setSyncedMeta({ progress: cableCar1.syncedMeta.progress + 1 });
        }
    } else if (cableCar1.syncedMeta.direction == 'Down') {
        if (cableCar1.syncedMeta.progress <= 0) {
            cableCar1.setSyncedMeta({ direction: 'Up' });
        } else {
            cableCar1.setSyncedMeta({ progress: cableCar1.syncedMeta.progress - 1 });
        }
    }
    playCableCarAnim(cableCar1);
    cableCar1.pos = cableCarRoute[0][cableCar1.syncedMeta.progress];
    cableCar1.setSyncedMeta({
        heading: -getHeadingFromVector2d(
            cableCarRoute[0][
                cableCar1.syncedMeta.progress >= 13 ? cableCar1.syncedMeta.progress : cableCar1.syncedMeta.progress + 1
            ],
            cableCarRoute[0][
                cableCar1.syncedMeta.progress >= 13 ? cableCar1.syncedMeta.progress - 1 : cableCar1.syncedMeta.progress
            ],
            true
        ),
    });
    if (cableCar2.syncedMeta.direction == 'Up') {
        if (cableCar2.syncedMeta.progress >= 13) {
            cableCar2.setSyncedMeta({ direction: 'Down' });
        } else {
            cableCar2.setSyncedMeta({ progress: cableCar2.syncedMeta.progress + 1 });
        }
    } else if (cableCar2.syncedMeta.direction == 'Down') {
        if (cableCar2.syncedMeta.progress <= 0) {
            cableCar2.setSyncedMeta({ direction: 'Up' });
        } else {
            cableCar2.setSyncedMeta({ progress: cableCar2.syncedMeta.progress - 1 });
        }
    }
    playCableCarAnim(cableCar2);
    cableCar2.pos = cableCarRoute[1][cableCar2.syncedMeta.progress];
    cableCar2.setSyncedMeta({
        heading: getHeadingFromVector2d(
            cableCarRoute[1][
                cableCar2.syncedMeta.progress >= 13 ? cableCar2.syncedMeta.progress - 1 : cableCar2.syncedMeta.progress
            ],
            cableCarRoute[1][
                cableCar2.syncedMeta.progress >= 13 ? cableCar2.syncedMeta.progress : cableCar2.syncedMeta.progress + 1
            ],
            true
        ),
    });
}, 1000);

function playCableCarAnim(cableCar: CableCar) {
    if (alt.Player.all.length <= 0) return;
    let animString: string = 'c';
    animString += cableCar.syncedMeta.id + 1;
    if (cableCar.syncedMeta.direction == 'Up') {
        switch (cableCar.syncedMeta.progress) {
            case 0:
                animString += '_up_1';
                break;
            case 1:
                animString += '_up_2';
                break;
            case 2:
                animString += '_up_3';
                break;
            case 3:
                animString += '_up_4';
                break;
            case 4:
                animString += '_up_5';
                break;
            case 5:
                animString += '_up_6';
                break;
            case 6:
                animString += '_up_7';
                break;
            case 7:
                animString += '_up_8';
                break;
            case 8:
                animString += '_up_9';
                break;
            case 9:
                animString += '_up_9';
                break;
            case 10:
                animString += '_up_9';
                break;
            case 11:
                animString += '_up_9';
                break;
            case 12:
                animString += '_up_9';
                break;
            case 13:
                animString += '_up_9';
                break;
            default:
                return;
        }
    } else if (cableCar.syncedMeta.direction == 'Down') {
        switch (cableCar.syncedMeta.progress) {
            case 0:
                animString += '_down_1';
                break;
            case 1:
                animString += '_down_2';
                break;
            case 2:
                animString += '_down_3';
                break;
            case 3:
                animString += '_down_4';
                break;
            case 4:
                animString += '_down_5';
                break;
            case 5:
                animString += '_down_6';
                break;
            case 6:
                animString += '_down_7';
                break;
            case 7:
                animString += '_down_8';
                break;
            case 8:
                animString += '_down_9';
                break;
            case 9:
                animString += '_down_9';
                break;
            case 10:
                animString += '_down_9';
                break;
            case 11:
                animString += '_down_9';
                break;
            case 12:
                animString += '_down_9';
                break;
            case 13:
                animString += '_down_9';
                break;
            default:
                return;
        }
    }
    cableCar.setSyncedMeta({ animation: animString });
}

function getHeadingFromVector2d(pos1: alt.IVector3, pos2: alt.IVector3, unk: boolean): number {
    let fVar0 = 0;
    let fVar1 = 0;
    let fVar2 = 0;

    fVar1 = pos2.x - pos1.x;
    fVar2 = pos2.y - pos1.y;
    if (fVar2 != 0) {
        fVar0 = Math.atan2(fVar1, fVar2);
    } else if (fVar1 < 0) {
        fVar0 = -90;
    } else {
        fVar0 = 90;
    }
    if (unk) {
        fVar0 = fVar0 * -1;
        if (fVar0 < 0) {
            fVar0 = fVar0 + 360;
        }
    }
    return (fVar0 * 180) / Math.PI;
}
