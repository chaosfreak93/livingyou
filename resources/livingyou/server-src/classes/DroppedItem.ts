import * as alt from 'alt-server';
import * as xsync from 'altv-xsync-entity-server';
import { EntityPools } from '../../shared/enums/entityPools';
import IDroppedItemSyncedMeta from '../../shared/interface/syncEntity/IDroppedItemSyncedMeta';
import IDroppedItemMeta from '../../shared/interface/syncEntity/IDroppedItemMeta';

const droppedItemPool = new xsync.EntityPool(EntityPools.DroppedItem, { maxStreamedIn: 15 });

class DroppedItem extends xsync.Entity<IDroppedItemSyncedMeta, IDroppedItemMeta> {
    constructor(droppedItemId: number, pos: alt.IVector3) {
        super(droppedItemPool, pos, {}, { droppedItemId }, 0, 250);
    }
}
