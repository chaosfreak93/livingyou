import * as alt from 'alt-client';
import IWebInventory from '../../shared/interface/IWebInventory';
import { WebViewController } from '../extensions/webViewController';
import { EmitServer } from './eventSystem/emit';
import { On, OnServer } from './eventSystem/on';

export default class Inventory {
    static ready: boolean = false;

    @OnServer('inventory:Open')
    static async open(
        pockets: IWebInventory,
        backpack: IWebInventory = null,
        other: IWebInventory = null
    ): Promise<void> {
        alt.toggleGameControls(false);
        const view: alt.WebView = await WebViewController.get();
        view.on('inventoryReady', () => {
            Inventory.ready = true;
            Inventory.update(pockets, backpack, other);
        });
        view.on('useItem', Inventory.useItem);
        view.on('dropItem', Inventory.dropItem);

        await WebViewController.setOverlaysVisible(false);
        await WebViewController.openPages(['Inventory']);
        await WebViewController.focus();
        await WebViewController.showCursor(true);
    }

    @OnServer('inventory:Update')
    static async update(
        pockets: IWebInventory,
        backpack: IWebInventory = null,
        other: IWebInventory = null
    ): Promise<void> {
        await alt.Utils.waitFor(() => Inventory.ready == true);
        const view: alt.WebView = await WebViewController.get();
        view.emit('setData', pockets, backpack, other);
    }

    static useItem(inventory: any, item: any): void {
        inventory = parseInt(inventory);
        item = JSON.parse(item);
        EmitServer('inventory:UseItem', inventory, item);
    }

    static dropItem(inventory: any, item: any): void {
        inventory = parseInt(inventory);
        item = JSON.parse(item);
        EmitServer('inventory:DropItem', inventory, item);
    }

    @On('disconnect')
    @OnServer('inventory:Close')
    static async close(): Promise<void> {
        await WebViewController.showCursor(false);
        await WebViewController.unfocus();
        await WebViewController.closePages(['Inventory']);
        await WebViewController.setOverlaysVisible(true);

        const view: alt.WebView = await WebViewController.get();
        view.off('inventoryReady', () => {
            Inventory.update(null, null, null);
            Inventory.ready = false;
        });
        view.off('useItem', Inventory.useItem);
        view.off('dropItem', Inventory.dropItem);
        alt.toggleGameControls(true);
    }
}
