import IItem from './IItem';

export default interface IWebInventory {
    maxWeight: number;
    currentWeight: number;
    items: { item: IItem; amount: number }[];
}
