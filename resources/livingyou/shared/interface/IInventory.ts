import IItem from './IItem';

export default interface IInventory {
    maxWeight: number;
    currentWeight: number;
    items: IItem[];
}
