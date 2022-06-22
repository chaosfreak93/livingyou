import IInventoryItem from './IInventoryItem';

export default interface IInventory {
    maxWeight: number;
    currentWeight: number;
    items: IInventoryItem[];
}
