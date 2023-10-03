import * as alt from 'alt-client';
import { On } from '../systems/eventSystem/on';

class DroppedItemEntity {
    static droppedItemEntityPool: { id: string, entity: alt.LocalObject }[] = [];

    @On('worldObjectStreamIn')
    private streamIn(object: alt.WorldObject): void {
        if (!(object instanceof alt.VirtualEntity)) return;
        if (object.getStreamSyncedMeta('type') !== 'droppedItem') return;

        let droppedItemEntity = new alt.LocalObject(
            object.getStreamSyncedMeta('model') as string,
            object.pos,
            object.getStreamSyncedMeta('rot') as alt.Vector3,
            false,
            false,
        );
        droppedItemEntity.frozen = true;
        droppedItemEntity.positionFrozen = true;

        DroppedItemEntity.droppedItemEntityPool.push({
            id: object.getStreamSyncedMeta('droppedItemId') as string,
            entity: droppedItemEntity
        });
    }

    @On('worldObjectStreamOut')
    private streamOut(object: alt.WorldObject): void {
        if (!(object instanceof alt.VirtualEntity)) return;
        if (object.getStreamSyncedMeta('type') !== 'droppedItem') return;

        let droppedItemEntity = DroppedItemEntity.droppedItemEntityPool.find((value) => value.id === object.getStreamSyncedMeta('droppedItemId') as string);
        droppedItemEntity.entity.destroy();
        const droppedItemEntityIndex = DroppedItemEntity.droppedItemEntityPool.indexOf(droppedItemEntity);
        DroppedItemEntity.droppedItemEntityPool.splice(droppedItemEntityIndex, 1);
    }
}
