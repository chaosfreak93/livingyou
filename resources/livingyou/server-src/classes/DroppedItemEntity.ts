import * as alt from 'alt-server';
import * as xsync from 'altv-xsync-entity-server';
import { EntityPools } from '../../shared/enums/entityPools';
import IDroppedItemSyncedMeta from '../../shared/interface/syncEntity/IDroppedItemSyncedMeta';
import IDroppedItemMeta from '../../shared/interface/syncEntity/IDroppedItemMeta';

const droppedItemEntityPool = new xsync.EntityPool(EntityPools.DroppedItemEntity, { maxStreamedIn: 15 });

class DroppedItemEntity extends xsync.Entity<IDroppedItemSyncedMeta, IDroppedItemMeta> {
    constructor(droppedItemId: number, pos: alt.IVector3) {
        super(droppedItemEntityPool, pos, {}, { droppedItemId }, 0, 250);
    }
}
