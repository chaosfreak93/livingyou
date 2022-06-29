import * as alt from 'alt-server';
import Database from '@stuyk/ezmongodb';
import IDroppedItem from '../../shared/interface/IDroppedItem';
import DroppedItemEntity from '../classes/DroppedItemEntity';
import TextLabel from '../classes/TextLabel';
import Items from './items';
import { ObjectId } from 'bson';
import IInventoryItem from '../../shared/interface/IInventoryItem';

export default class DroppedItems {
    static droppedItems: IDroppedItem[] = [];
    static droppedItemEntitys: { item: DroppedItemEntity; label: TextLabel }[] = [];

    static async addDroppedItem(
        pos: alt.Vector3,
        rot: alt.Vector3,
        model: string,
        item: IInventoryItem
    ): Promise<void> {
        let id = new ObjectId().toString();
        let droppedItem = {
            id: id,
            location: pos,
            rotation: rot,
            model: model,
            item: item,
        };
        this.droppedItems.push(droppedItem);
        let itemName = Items.getItemById(item.id).name;
        DroppedItems.droppedItemEntitys.push({
            item: new DroppedItemEntity(id, pos, rot, model, item),
            label: new TextLabel(
                id,
                new alt.Vector3(pos.x, pos.y, pos.z + 0.25),
                itemName + ' [' + item.amount + ']',
                1,
                2,
                { r: 255, g: 255, b: 255, a: 255 },
                true,
                false,
                true
            ),
        });
        await Database.insertData<IDroppedItem>(droppedItem, 'droppedItems', true);
    }

    static async removeDroppedItem(id: string): Promise<void> {
        let droppedItem = this.droppedItems.find((value) => value.id == id);
        const droppedItemIndex = this.droppedItems.indexOf(droppedItem);
        this.droppedItems.splice(droppedItemIndex, 1);

        let droppedItemEntity = this.droppedItemEntitys.find((value) => value.item.meta.droppedItemId == id);
        droppedItemEntity.item.destroy();
        droppedItemEntity.label.destroy();
        const droppedItemEntityIndex = this.droppedItemEntitys.indexOf(droppedItemEntity);
        this.droppedItemEntitys.splice(droppedItemEntityIndex, 1);
        let findDroppedItems = await Database.fetchAllByField<IDroppedItem>('id', id, 'droppedItems');
        await Database.deleteById(findDroppedItems[0]._id, 'droppedItems');
    }

    static nearestDroppedItem(pos: alt.Vector3): { droppedItem: DroppedItemEntity; distance: number } {
        let distance: number;
        let droppedItem: DroppedItemEntity;
        for (let i = 0; i < this.droppedItemEntitys.length; i++) {
            let itemPos = this.droppedItemEntitys[i].item.pos;
            let newDistance = pos.distanceTo(itemPos);
            if (distance == undefined || distance >= newDistance) {
                distance = newDistance;
                droppedItem = this.droppedItemEntitys[i].item;
            }
        }
        if (!droppedItem) return null;
        return { droppedItem, distance };
    }

    static async setupDroppedItems() {
        DroppedItems.droppedItems = await Database.fetchAllData<IDroppedItem>('droppedItems');
        for (let i = 0; i < DroppedItems.droppedItems.length; i++) {
            let pos = DroppedItems.droppedItems[i].location;
            let itemName = Items.getItemById(DroppedItems.droppedItems[i].item.id).name;
            DroppedItems.droppedItemEntitys.push({
                item: new DroppedItemEntity(
                    DroppedItems.droppedItems[i].id,
                    pos,
                    DroppedItems.droppedItems[i].rotation,
                    DroppedItems.droppedItems[i].model,
                    DroppedItems.droppedItems[i].item
                ),
                label: new TextLabel(
                    DroppedItems.droppedItems[i].id,
                    new alt.Vector3(pos.x, pos.y, pos.z + 0.25),
                    itemName + ' [' + DroppedItems.droppedItems[i].item.amount + ']',
                    1,
                    2,
                    { r: 255, g: 255, b: 255, a: 255 },
                    true,
                    false,
                    true
                ),
            });
        }
    }
}
