import * as alt from 'alt-shared';
import { ObjectId } from 'bson';
import IInventoryItem from './IInventoryItem';

export default interface IDroppedItem {
    readonly _id?: ObjectId;
    id: string;
    location: alt.Vector3;
    rotation: alt.Vector3;
    model: string;
    item: IInventoryItem;
}
