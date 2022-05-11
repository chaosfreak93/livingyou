import IItem from './IItem';

export default interface IInventory {
    type: "Pocket" | "Bag" | "Trunk";
    maxWeight: number;
    currentWeight: number;
    items: IItem[];
}
