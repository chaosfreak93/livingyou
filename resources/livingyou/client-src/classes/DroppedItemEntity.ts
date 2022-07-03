import * as alt from 'alt-client';
import * as native from 'natives';
import * as xsync from 'altv-xsync-entity-client';
import { EntityPools } from '../../shared/enums/entityPools';
import IDroppedItemSyncedMeta from '../../shared/interface/syncEntity/IDroppedItemSyncedMeta';

@xsync.onEntityEvents<DroppedItemEntity>({
    streamIn: (entity) => entity.streamIn(),
    streamOut: (entity) => entity.streamOut(),
    syncedMetaChange: (entity, syncedMeta) => entity.syncedMetaChange(syncedMeta),
    posChange: (entity, pos) => entity.posChange(pos),
})
class DroppedItemEntity extends xsync.Entity<IDroppedItemSyncedMeta> {
    private droppedItem: number = 0;

    private streamIn(): void {
        this.droppedItem = native.createObject(
            alt.hash(this.syncedMeta.model),
            this.pos.x,
            this.pos.y,
            this.pos.z,
            false,
            false,
            false
        );
        native.setEntityHeading(this.droppedItem, this.syncedMeta.rot.z);
        native.freezeEntityPosition(this.droppedItem, true);
    }

    private streamOut(): void {
        native.deleteObject(this.droppedItem);
        this.droppedItem = 0;
    }

    private syncedMetaChange(syncedMeta: Partial<IDroppedItemSyncedMeta>): void {}

    public posChange(pos: alt.IVector3): void {}
}

new xsync.EntityPool(EntityPools.DroppedItemEntity, DroppedItemEntity);
