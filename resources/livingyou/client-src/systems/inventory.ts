import * as alt from 'alt-client';
import { WebViewEvents } from '../../shared/enums/WebViewEvents';
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
        const view = await WebViewController.get();
        view.on(WebViewEvents.INVENTORY_READY, () => {
            Inventory.ready = true;
            Inventory.update(pockets, backpack, other);
        });
        view.on(WebViewEvents.INVENTORY_USE_ITEM, Inventory.useItem);
        view.on(WebViewEvents.INVENTORY_DROP_ITEM, Inventory.dropItem);

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
        const view = await WebViewController.get();
        view.emit(WebViewEvents.INVENTORY_SET_DATA, pockets, backpack, other);
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

        const view = await WebViewController.get();
        view.off(WebViewEvents.INVENTORY_READY, () => {
            Inventory.update(null, null, null);
            Inventory.ready = false;
        });
        view.off(WebViewEvents.INVENTORY_USE_ITEM, Inventory.useItem);
        view.off(WebViewEvents.INVENTORY_DROP_ITEM, Inventory.dropItem);
    }
}
