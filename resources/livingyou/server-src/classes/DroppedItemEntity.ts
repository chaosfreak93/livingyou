import * as alt from 'alt-server';
import IInventoryItem from '../../shared/interface/IInventoryItem';

const droppedItemEntityPool = new alt.VirtualEntityGroup(15);

export default class DroppedItemEntity extends alt.VirtualEntity {
    constructor(
        droppedItemId: string,
        pos: alt.Vector3,
        rot: alt.Vector3,
        model: string,
        item: IInventoryItem
    ) {
        super(
            droppedItemEntityPool,
            pos,
            100,
            { type: 'droppedItem', droppedItemId, rot, model, item });
    }
}
