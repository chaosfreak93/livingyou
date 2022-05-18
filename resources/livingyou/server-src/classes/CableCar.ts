import * as alt from 'alt-server';
import * as xsync from 'altv-xsync-entity-server';
import ICableCarSyncedMeta from '../../shared/interface/ICableCarSyncedMeta';
import ICableCarMeta from '../../shared/interface/ICableCarMeta';
import { EntityPools } from '../../shared/enums/entityPools';
import cableCarRoute from '../../shared/data/cableCar';

const cableCarPool = new xsync.EntityPool(EntityPools.CableCar, { maxStreamedIn: 3 });

class CableCar extends xsync.Entity<ICableCarSyncedMeta, ICableCarMeta> {
    constructor(
        cableCarId: number,
        pos: alt.IVector3,
        heading: number,
        progress: number,
        animation: string,
        direction: 'Up' | 'Down',
        doorStatus: 'Open' | 'Close',
        attachedPlayer: {
            id: number;
            pos: alt.IVector3;
            rot: alt.IVector3;
        }[]
    ) {
        super(
            cableCarPool,
            pos,
            { heading, progress, animation, direction, doorStatus, attachedPlayer },
            { cableCarId },
            0,
            2000
        );
    }
}

const cableCar1 = new CableCar(
    0,
    cableCarRoute[0][0],
    getHeadingToNextPoint(cableCarRoute[0][1], cableCarRoute[0][0], false),
    0,
    '',
    'Up',
    'Close',
    []
);

const cableCar2 = new CableCar(
    1,
    cableCarRoute[1][0],
    getHeadingToNextPoint(cableCarRoute[1][0], cableCarRoute[1][1], true),
    0,
    '',
    'Down',
    'Close',
    []
);

cableCar1.id;

async function cableCar1Logic() {
    await alt.Utils.wait(10);
    try {
        await updateProgress(cableCar1);
        await playCableCarAnim(cableCar1);
        cableCar1.setSyncedMeta({
            heading: getHeadingToNextPoint(
                cableCarRoute[cableCar1.meta.cableCarId][
                    cableCar1.syncedMeta.progress >= 13
                        ? cableCar1.syncedMeta.progress
                        : cableCar1.syncedMeta.progress + 1
                ],
                cableCarRoute[cableCar1.meta.cableCarId][
                    cableCar1.syncedMeta.progress >= 13
                        ? cableCar1.syncedMeta.progress - 1
                        : cableCar1.syncedMeta.progress
                ],
                false
            ),
        });
        await moveCableCar(cableCar1);
        if (
            (cableCar1.syncedMeta.direction == 'Down' && cableCar1.syncedMeta.progress == 0) ||
            (cableCar1.syncedMeta.direction == 'Up' && cableCar1.syncedMeta.progress == 13)
        ) {
            cableCarArriveAtStation(cableCar1, cableCar1Logic);
            return;
        }
    } catch {}
    cableCar1Logic();
}

async function cableCar2Logic() {
    await alt.Utils.wait(10);
    try {
        await updateProgress(cableCar2);
        await playCableCarAnim(cableCar2);
        cableCar2.setSyncedMeta({
            heading: getHeadingToNextPoint(
                cableCarRoute[cableCar2.meta.cableCarId][
                    cableCar2.syncedMeta.progress >= 13
                        ? cableCar2.syncedMeta.progress - 1
                        : cableCar2.syncedMeta.progress
                ],
                cableCarRoute[cableCar2.meta.cableCarId][
                    cableCar2.syncedMeta.progress >= 13
                        ? cableCar2.syncedMeta.progress
                        : cableCar2.syncedMeta.progress + 1
                ],
                true
            ),
        });
        await moveCableCar(cableCar2);
        if (
            (cableCar2.syncedMeta.direction == 'Down' && cableCar2.syncedMeta.progress == 0) ||
            (cableCar2.syncedMeta.direction == 'Up' && cableCar2.syncedMeta.progress == 13)
        ) {
            cableCarArriveAtStation(cableCar2, cableCar2Logic);
            return;
        }
    } catch {}
    cableCar2Logic();
}

async function updateProgress(cableCar: CableCar): Promise<void> {
    return await new Promise((resolve) => {
        if (cableCar.syncedMeta.direction == 'Up') {
            if (cableCar.syncedMeta.progress >= 13) {
                cableCar.setSyncedMeta({ direction: 'Down' });
            } else {
                cableCar.setSyncedMeta({ progress: cableCar.syncedMeta.progress + 1 });
            }
        } else if (cableCar.syncedMeta.direction == 'Down') {
            if (cableCar.syncedMeta.progress <= 0) {
                cableCar.setSyncedMeta({ direction: 'Up' });
            } else {
                cableCar.setSyncedMeta({ progress: cableCar.syncedMeta.progress - 1 });
            }
        }
        resolve();
    });
}

async function playCableCarAnim(cableCar: CableCar): Promise<void> {
    return await new Promise((resolve) => {
        let animString: string = 'c';
        animString += cableCar.meta.cableCarId + 1;
        if (cableCar.syncedMeta.direction == 'Up') {
            switch (cableCar.syncedMeta.progress) {
                case 0:
                    animString += '_up_9';
                    break;
                case 1:
                    animString += '_up_1';
                    break;
                case 3:
                    animString += '_up_3';
                    break;
                case 5:
                    animString += '_up_4';
                    break;
                case 7:
                    animString += '_up_5';
                    break;
                case 9:
                    animString += '_up_6';
                    break;
                case 11:
                    animString += '_up_8';
                    break;
                case 12:
                    animString += '_up_9';
                    break;
                default:
                    resolve();
                    return;
            }
        } else if (cableCar.syncedMeta.direction == 'Down') {
            switch (cableCar.syncedMeta.progress) {
                case 0:
                    animString += '_down_9';
                    break;
                case 1:
                    animString += '_down_8';
                    break;
                case 3:
                    animString += '_down_6';
                    break;
                case 5:
                    animString += '_down_5';
                    break;
                case 7:
                    animString += '_down_4';
                    break;
                case 9:
                    animString += '_down_3';
                    break;
                case 11:
                    animString += '_down_2';
                    break;
                case 12:
                    animString += '_down_1';
                    break;
                default:
                    resolve();
                    return;
            }
        }
        cableCar.setSyncedMeta({ animation: animString });
        resolve();
    });
}

function getHeadingToNextPoint(pos1: alt.IVector3, pos2: alt.IVector3, unk: boolean): number {
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

async function moveCableCar(cableCar: CableCar): Promise<void> {
    return await new Promise(async (resolve) => {
        let route = await divideIntoSegments(
            new alt.Vector3(cableCarRoute[cableCar.meta.cableCarId][cableCar.syncedMeta.progress]),
            new alt.Vector3(
                cableCarRoute[cableCar.meta.cableCarId][
                    cableCar.syncedMeta.direction == 'Down'
                        ? cableCar.syncedMeta.progress <= 0
                            ? cableCar.syncedMeta.progress
                            : cableCar.syncedMeta.progress - 1
                        : cableCar.syncedMeta.progress >= 13
                        ? cableCar.syncedMeta.progress
                        : cableCar.syncedMeta.progress + 1
                ]
            ),
            new alt.Vector3(cableCarRoute[cableCar.meta.cableCarId][cableCar.syncedMeta.progress]).distanceTo(
                new alt.Vector3(
                    cableCarRoute[cableCar.meta.cableCarId][
                        cableCar.syncedMeta.direction == 'Down'
                            ? cableCar.syncedMeta.progress <= 0
                                ? cableCar.syncedMeta.progress
                                : cableCar.syncedMeta.progress - 1
                            : cableCar.syncedMeta.progress >= 13
                            ? cableCar.syncedMeta.progress
                            : cableCar.syncedMeta.progress + 1
                    ]
                )
            ) * 4
        );
        for (let i = 0; i < route.length; i++) {
            cableCar.pos = route[i];
            await alt.Utils.wait(25);
        }
        resolve();
    });
}

async function divideIntoSegments(pos1: alt.Vector3, pos2: alt.Vector3, pieces: number): Promise<alt.Vector3[]> {
    return await new Promise((resolve) => {
        let dx = (pos2.x - pos1.x) / pieces;
        let dy = (pos2.y - pos1.y) / pieces;
        let dz = (pos2.z - pos1.z) / pieces;

        let interiorPoints = [];

        for (let i = 1; i < pieces; i++)
            interiorPoints.push(new alt.Vector3(pos1.x + i * dx, pos1.y + i * dy, pos1.z + i * dz));

        resolve([pos1, ...interiorPoints, pos2]);
    });
}

async function cableCarArriveAtStation(cableCar: CableCar, logic: Function): Promise<void> {
    await alt.Utils.wait(500);
    cableCar.setSyncedMeta({ attachedPlayer: [] });
    cableCar.setSyncedMeta({ doorStatus: 'Open' });
    await alt.Utils.wait(10000);
    cableCar.setSyncedMeta({ doorStatus: 'Close' });
    let players = alt.Player.all;
    let playersToAttach: {
        id: number;
        pos: alt.IVector3;
        rot: alt.IVector3;
    }[] = [];
    let rangeOffset1 = new alt.Vector3(cableCar.pos).add(1.3, 0, 0).sub(0, 0, 5.3);
    let rangeOffset2 = new alt.Vector3(cableCar.pos).sub(1.3, 0, 0).sub(0, 0, 5.3);
    for (let i = 0; i < players.length; i++) {
        if (rangeOffset1.isInRange(players[i].pos, 1.55) || rangeOffset2.isInRange(players[i].pos, 1.55)) {
            playersToAttach.push({
                id: players[i].id,
                // TODO Fix attach position
                pos: players[i].pos.sub(new alt.Vector3(cableCar.pos)),
                rot: players[i].rot.toDegrees(),
            });
        }
    }
    cableCar.setSyncedMeta({ attachedPlayer: playersToAttach });
    await alt.Utils.wait(500);
    logic.call(cableCar);
}

cableCar1Logic();
cableCar2Logic();
