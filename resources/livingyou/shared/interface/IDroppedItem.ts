import { ObjectId } from 'bson';
import IInventoryItem from './IInventoryItem';

export default interface IDroppedItem {
    readonly _id?: ObjectId;
    id: string;
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
