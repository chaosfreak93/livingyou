import IInventoryItem from './IInventoryItem';

export default interface IDroppedItem {
    location: {
        x: number;
        y: number;
        z: number;
    };
    rotation: {
        x: number;
        y: number;
        z: number;
    };
    model: string;
    item: IInventoryItem;
}
