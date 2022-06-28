import Database from '@stuyk/ezmongodb';
import IDroppedItem from '../../shared/interface/IDroppedItem';
import DroppedItemEntity from '../classes/DroppedItemEntity';

export default class DroppedItems {
    static droppedItems: IDroppedItem[];

    static async setupDroppedItems() {
        DroppedItems.droppedItems = await Database.fetchAllData<IDroppedItem>('droppedItems');
        for (let i = 0; i < DroppedItems.droppedItems.length; i++) {
            new DroppedItemEntity(
                i,
                DroppedItems.droppedItems[i].location,
                DroppedItems.droppedItems[i].rotation,
                DroppedItems.droppedItems[i].model
            );
        }
    }
}
