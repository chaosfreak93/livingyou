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
    private streamIn(): void {}

    private streamOut(): void {}

    private syncedMetaChange(syncedMeta: Partial<IDroppedItemSyncedMeta>): void {}

    public posChange(pos: alt.IVector3): void {}
}

new xsync.EntityPool(EntityPools.DroppedItemEntity, DroppedItemEntity);
