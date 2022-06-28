import * as alt from 'alt-server';
import * as xsync from 'altv-xsync-entity-server';
import { EntityPools } from '../../shared/enums/entityPools';
import IDroppedItemSyncedMeta from '../../shared/interface/syncEntity/IDroppedItemSyncedMeta';
import IDroppedItemMeta from '../../shared/interface/syncEntity/IDroppedItemMeta';

const droppedItemEntityPool = new xsync.EntityPool(EntityPools.DroppedItemEntity, { maxStreamedIn: 15 });

export default class DroppedItemEntity extends xsync.Entity<IDroppedItemSyncedMeta, IDroppedItemMeta> {
    constructor(droppedItemId: number, pos: alt.IVector3, rot: alt.IVector3, model: string) {
        super(droppedItemEntityPool, pos, { rot, model }, { droppedItemId }, 0, 250);
    }
}
