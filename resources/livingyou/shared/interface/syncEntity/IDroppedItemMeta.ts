import IInventoryItem from '../IInventoryItem';

export default interface IDroppedItemMeta {
    droppedItemId: string;
    item: IInventoryItem;
}
