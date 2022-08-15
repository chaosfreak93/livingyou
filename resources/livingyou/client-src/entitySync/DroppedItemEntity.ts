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
    private droppedItem: alt.Object = null;

    private streamIn(): void {
        this.droppedItem = new alt.Object(
            alt.hash(this.syncedMeta.model),
            new alt.Vector3(this.pos.x, this.pos.y, this.pos.z),
            new alt.Vector3(this.syncedMeta.rot.x, this.syncedMeta.rot.y, this.syncedMeta.rot.z),
            false,
            false
        );
        native.setEntityInvincible(this.droppedItem, true);
        native.freezeEntityPosition(this.droppedItem, true);
    }

    private streamOut(): void {
        this.droppedItem.destroy();
        this.droppedItem = null;
    }

    private syncedMetaChange(syncedMeta: Partial<IDroppedItemSyncedMeta>): void {}

    public posChange(pos: alt.IVector3): void {}
}

new xsync.EntityPool(EntityPools.DroppedItemEntity, DroppedItemEntity);
