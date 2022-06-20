import * as alt from 'alt-client';
import * as native from 'natives';
import IInventory from '../../shared/interface/IInventory';
import { WebViewController } from '../extensions/webViewController';
import { On, OnServer } from './eventSystem/on';

export default class Inventory {
    @OnServer('inventory:Open')
    static async open(
        inventory1: IInventory,
        inventory2: IInventory = null,
        inventory3: IInventory = null
    ): Promise<void> {
        const view = await WebViewController.get();
        view.on('inventoryReady', () => Inventory.inventoryReady(inventory1, inventory2, inventory3));

        await WebViewController.setOverlaysVisible(false);
        await WebViewController.openPages(['Inventory']);
        await WebViewController.focus();
        await WebViewController.showCursor(true);
    }

    static async inventoryReady(inventory1: IInventory, inventory2: IInventory, inventory3: IInventory): Promise<void> {
        const view = await WebViewController.get();
        view.emit('setData', inventory1, inventory2, inventory3);
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
    }
}
