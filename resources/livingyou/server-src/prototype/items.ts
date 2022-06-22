import Database from '@stuyk/ezmongodb';
import * as alt from 'alt-server';
import IItem from '../../shared/interface/IItem';

export default class Items {
    static items: IItem[];

    static getItemByName(name: string): IItem | null {
        return this.items.find((value: IItem) => {
            value.name == name;
        });
    }

    static getItemById(id: string): IItem | null {
        return this.items.find((value: IItem) => {
            value.id == id;
        });
    }

    static async fetchItems(): Promise<void> {
        Items.items = await Database.fetchAllData<IItem>('items');
    }
}
