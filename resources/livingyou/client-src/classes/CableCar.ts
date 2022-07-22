import * as alt from 'alt-client';
import * as native from 'natives';
import * as xsync from 'altv-xsync-entity-client';
import ICableCarSyncedMeta from '../../shared/interface/syncEntity/ICableCarSyncedMeta';
import { EntityPools } from '../../shared/enums/entityPools';

@xsync.onEntityEvents<CableCar>({
    streamIn: (entity) => entity.streamIn(),
    streamOut: (entity) => entity.streamOut(),
    syncedMetaChange: (entity, syncedMeta) => entity.syncedMetaChange(syncedMeta),
    posChange: (entity, pos) => entity.posChange(pos),
})
class CableCar extends xsync.Entity<ICableCarSyncedMeta> {
    private cableCar: number = 0;
    private cableCarDoor_r: number[] = [];
    private cableCarDoor_l: number[] = [];
    private animation: string = '';
    private heading: number = 0;
    private doorStatus: 'Open' | 'Close' = 'Close';
    private attachedPlayer: {
        id: number;
        pos: alt.IVector3;
        rot: alt.IVector3;
    }[];

    private streamIn(): void {
        alt.Utils.requestAnimDict('p_cablecar_s', 4000);
        this.heading = this.syncedMeta.heading;
        this.doorStatus = this.syncedMeta.doorStatus;
        this.attachedPlayer = this.syncedMeta.attachedPlayer;
        this.cableCar = native.createObject(
            alt.hash('p_cablecar_s'),
            this.pos.x - 0.2,
            this.pos.y,
            this.pos.z,
            false,
            false,
            false
        );
        native.freezeEntityPosition(this.cableCar, true);
        native.setEntityCoords(this.cableCar, this.pos.x - 0.2, this.pos.y, this.pos.z, true, false, false, true);
        native.setEntityHeading(this.cableCar, this.heading);
        this.cableCarDoor_l[0] = native.createObject(
            alt.hash('p_cablecar_s_door_l'),
            this.pos.x - 0.2,
            this.pos.y,
            this.pos.z,
            false,
            false,
            false
        );
        native.setEntityHeading(this.cableCarDoor_l[0], this.heading);
        this.cableCarDoor_l[1] = native.createObject(
            alt.hash('p_cablecar_s_door_r'),
            this.pos.x - 0.2,
            this.pos.y,
            this.pos.z,
            false,
            false,
            false
        );
        native.setEntityHeading(this.cableCarDoor_l[1], this.heading);
        native.attachEntityToEntity(
            this.cableCarDoor_l[0],
            this.cableCar,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            false,
            false,
            true,
            false,
            2,
            true
        );
        native.attachEntityToEntity(
            this.cableCarDoor_l[1],
            this.cableCar,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            false,
            false,
            true,
            false,
            2,
            true
        );
        this.cableCarDoor_r[0] = native.createObject(
            alt.hash('p_cablecar_s_door_l'),
            this.pos.x - 0.2,
            this.pos.y,
            this.pos.z,
            false,
            false,
            false
        );
        this.cableCarDoor_r[1] = native.createObject(
            alt.hash('p_cablecar_s_door_r'),
            this.pos.x - 0.2,
            this.pos.y,
            this.pos.z,
            false,
            false,
            false
        );
        native.attachEntityToEntity(
            this.cableCarDoor_r[0],
            this.cableCar,
            0,
            0,
            0,
            0,
            0,
            0,
            180,
            false,
            false,
            true,
            false,
            2,
            true
        );
        native.attachEntityToEntity(
            this.cableCarDoor_r[1],
            this.cableCar,
            0,
            0,
            0,
            0,
            0,
            0,
            180,
            false,
            false,
            true,
            false,
            2,
            true
        );
        for (let i = 0; i < this.attachedPlayer.length; i++) {
            let player = alt.Player.getByID(this.attachedPlayer[i].id);
            if (player == null || !player.valid) continue;
            native.attachEntityToEntity(
                player.scriptID,
                this.cableCar,
                0,
                this.attachedPlayer[i].pos.x,
                this.attachedPlayer[i].pos.y,
                this.attachedPlayer[i].pos.z,
                0,
                0,
                0,
                false,
                false,
                true,
                false,
                2,
                true
            );
        }
    }

    private streamOut(): void {
        native.deleteObject(this.cableCar);
        native.deleteObject(this.cableCarDoor_r[0]);
        native.deleteObject(this.cableCarDoor_r[1]);
        native.deleteObject(this.cableCarDoor_l[0]);
        native.deleteObject(this.cableCarDoor_l[1]);
    }

    private syncedMetaChange(syncedMeta: Partial<ICableCarSyncedMeta>): void {
        if (syncedMeta.animation !== undefined && this.animation !== syncedMeta.animation) {
            this.animation = syncedMeta.animation;
            native.playEntityAnim(this.cableCar, this.animation, 'p_cablecar_s', 8, false, true, false, 0, 0);
        }
        if (syncedMeta.heading !== undefined && this.heading !== syncedMeta.heading) {
            this.heading = syncedMeta.heading;
            native.setEntityHeading(this.cableCar, this.heading);
        }
        if (syncedMeta.attachedPlayer !== undefined && this.attachedPlayer !== syncedMeta.attachedPlayer) {
            let attachedToCableCar;
            if (syncedMeta.attachedPlayer.length == 0) {
                attachedToCableCar = this.attachedPlayer;
            } else if (syncedMeta.attachedPlayer.length >= 1) {
                attachedToCableCar = syncedMeta.attachedPlayer;
            }
            for (let i = 0; i < attachedToCableCar.length; i++) {
                let player = alt.Player.getByID(attachedToCableCar[i].id);
                if (player == null || !player.valid) continue;
                if (
                    native.isEntityAttachedToEntity(player.scriptID, this.cableCar) &&
                    syncedMeta.attachedPlayer.length == 0
                ) {
                    native.detachEntity(player.scriptID, true, false);
                } else {
                    native.attachEntityToEntity(
                        player.scriptID,
                        this.cableCar,
                        0,
                        attachedToCableCar[i].pos.x,
                        attachedToCableCar[i].pos.y,
                        attachedToCableCar[i].pos.z,
                        0,
                        0,
                        0,
                        false,
                        false,
                        true,
                        false,
                        2,
                        true
                    );
                }
            }
            this.attachedPlayer = syncedMeta.attachedPlayer;
        }
        if (syncedMeta.doorStatus !== undefined && this.doorStatus !== syncedMeta.doorStatus) {
            this.doorStatus = syncedMeta.doorStatus;
            if (this.doorStatus == 'Close') {
                native.detachEntity(this.cableCarDoor_l[0], true, true);
                native.detachEntity(this.cableCarDoor_l[1], true, true);
                native.detachEntity(this.cableCarDoor_r[0], true, true);
                native.detachEntity(this.cableCarDoor_r[1], true, true);
                native.attachEntityToEntity(
                    this.cableCarDoor_l[0],
                    this.cableCar,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    false,
                    false,
                    true,
                    false,
                    2,
                    true
                );
                native.attachEntityToEntity(
                    this.cableCarDoor_l[1],
                    this.cableCar,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    false,
                    false,
                    true,
                    false,
                    2,
                    true
                );
                native.attachEntityToEntity(
                    this.cableCarDoor_r[0],
                    this.cableCar,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    180,
                    false,
                    false,
                    true,
                    false,
                    2,
                    true
                );
                native.attachEntityToEntity(
                    this.cableCarDoor_r[1],
                    this.cableCar,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    180,
                    false,
                    false,
                    true,
                    false,
                    2,
                    true
                );
            } else if (this.doorStatus == 'Open') {
                native.detachEntity(this.cableCarDoor_l[0], true, true);
                native.detachEntity(this.cableCarDoor_l[1], true, true);
                native.detachEntity(this.cableCarDoor_r[0], true, true);
                native.detachEntity(this.cableCarDoor_r[1], true, true);
                native.attachEntityToEntity(
                    this.cableCarDoor_l[0],
                    this.cableCar,
                    0,
                    0,
                    0.88,
                    0,
                    0,
                    0,
                    0,
                    false,
                    false,
                    true,
                    false,
                    2,
                    true
                );
                native.attachEntityToEntity(
                    this.cableCarDoor_l[1],
                    this.cableCar,
                    0,
                    0,
                    -0.88,
                    0,
                    0,
                    0,
                    0,
                    false,
                    false,
                    true,
                    false,
                    2,
                    true
                );
                native.attachEntityToEntity(
                    this.cableCarDoor_r[0],
                    this.cableCar,
                    0,
                    0,
                    -0.88,
                    0,
                    0,
                    0,
                    180,
                    false,
                    false,
                    true,
                    false,
                    2,
                    true
                );
                native.attachEntityToEntity(
                    this.cableCarDoor_r[1],
                    this.cableCar,
                    0,
                    0,
                    0.88,
                    0,
                    0,
                    0,
                    180,
                    false,
                    false,
                    true,
                    false,
                    2,
                    true
                );
            }
        }
    }

    public posChange(pos: alt.IVector3): void {
        native.setEntityCoords(this.cableCar, pos.x - 0.2, pos.y, pos.z, true, false, false, false);
    }
}

new xsync.EntityPool(EntityPools.CableCar, CableCar);
