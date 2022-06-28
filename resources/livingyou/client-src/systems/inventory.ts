import IWebInventory from '../../shared/interface/IWebInventory';
import { WebViewController } from '../extensions/webViewController';
import { EmitServer } from './eventSystem/emit';
import { On, OnServer } from './eventSystem/on';

export default class Inventory {
    @OnServer('inventory:Open')
    static async open(
        inventoryItems1: IWebInventory,
        inventoryItems2: IWebInventory = null,
        inventoryItems3: IWebInventory = null
    ): Promise<void> {
        const view = await WebViewController.get();
        view.on('inventoryReady', () => Inventory.inventoryReady(inventoryItems1, inventoryItems2, inventoryItems3));
        view.on('useItem', Inventory.useItem);

        await WebViewController.setOverlaysVisible(false);
        await WebViewController.openPages(['Inventory']);
        await WebViewController.focus();
        await WebViewController.showCursor(true);
    }

    static async inventoryReady(
        inventoryItems1: IWebInventory,
        inventoryItems2: IWebInventory,
        inventoryItems3: IWebInventory
    ): Promise<void> {
        const view = await WebViewController.get();
        view.emit('setData', inventoryItems1, inventoryItems2, inventoryItems3);
    }

    static useItem(inventory: any, item: any): void {
        inventory = parseInt(inventory);
        item = JSON.parse(item);
        EmitServer('inventory:UseItem', inventory, item);
    }

    @On('disconnect')
    @OnServer('inventory:Close')
    static async close(): Promise<void> {
        await WebViewController.showCursor(false);
        await WebViewController.unfocus();
        await WebViewController.closePages(['Inventory']);
        await WebViewController.setOverlaysVisible(true);

        const view = await WebViewController.get();
        view.off('inventoryReady', () => Inventory.inventoryReady(null, null, null));
        view.off('useItem', Inventory.useItem);
    }
}
