import * as alt from 'alt-client';
import * as native from 'natives';
import * as xsync from 'altv-xsync-entity-client';
import ICableCarData from '../../shared/interface/ICableCarData';
import { EntityPools } from '../../shared/enums/entityPools';

@xsync.onEntityEvents<CableCar>({
    streamIn: (entity) => entity.streamIn(),
    streamOut: (entity) => entity.streamOut(),
    syncedMetaChange: (entity, syncedMeta) => entity.syncedMetaChange(syncedMeta),
    posChange: (entity, pos) => entity.posChange(pos),
})
class CableCar extends xsync.Entity<ICableCarData> {
    private objectId = 0;

    private streamIn(): void {
        this.objectId = native.createObject(
            alt.hash(this.syncedMeta.model),
            this.pos.x,
            this.pos.y,
            this.pos.z,
            false,
            false,
            false
        );
    }

    private streamOut(): void {
        native.deleteObject(this.objectId);
    }

    private syncedMetaChange(syncedMeta: Partial<ICableCarData>): void {}

    public posChange(pos: alt.IVector3): void {}
}

new xsync.EntityPool(EntityPools.CableCar, CableCar);
