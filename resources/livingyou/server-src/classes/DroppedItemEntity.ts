import * as alt from 'alt-server';
import * as xsync from 'altv-xsync-entity-server';
import { EntityPools } from '../../shared/enums/entityPools';
import IDroppedItemSyncedMeta from '../../shared/interface/syncEntity/IDroppedItemSyncedMeta';
import IDroppedItemMeta from '../../shared/interface/syncEntity/IDroppedItemMeta';
import IInventoryItem from '../../shared/interface/IInventoryItem';

const droppedItemEntityPool = new xsync.EntityPool(EntityPools.DroppedItemEntity, { maxStreamedIn: 15 });

export default class DroppedItemEntity extends xsync.Entity<IDroppedItemSyncedMeta, IDroppedItemMeta> {
    constructor(droppedItemId: string, pos: alt.IVector3, rot: alt.IVector3, model: string, item: IInventoryItem) {
        super(droppedItemEntityPool, pos, { rot, model }, { droppedItemId, item }, 0, 100);
    }
}
