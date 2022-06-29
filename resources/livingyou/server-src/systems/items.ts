import Database from '@stuyk/ezmongodb';
import IItem from '../../shared/interface/IItem';

export default class Items {
    static items: IItem[];

    static getItemByName(name: string): IItem | undefined {
        return Items.items.find((value: IItem) => value.name === name);
    }

    static getItemById(id: string): IItem | undefined {
        return Items.items.find((value: IItem) => value.id === id);
    }

    static async fetchItems(): Promise<void> {
        Items.items = await Database.fetchAllData<IItem>('items');
    }
}
