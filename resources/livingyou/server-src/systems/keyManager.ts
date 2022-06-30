import * as alt from 'alt-server';
import IWebInventory from '../../shared/interface/IWebInventory';
import DroppedItems from './droppedItems';
import { EmitClient } from './eventSystem/emit';
import { OnClient } from './eventSystem/on';
import Inventory from './inventory';

export default class KeyManager {
    @OnClient('keyManager:KeyUp')
    static keyUp(player: alt.Player, key: number): void {
        if (!player.character) return;
        switch (key) {
            case 112:
                EmitClient(player, 'devTools:PosAndRot');
                break;
            case 73:
                if (player.inventoryOpen) {
                    EmitClient(player, 'inventory:Close');
                    player.inventoryOpen = false;
                } else {
                    let pocketInventory: IWebInventory = Inventory.createWebinventory(player.character.pocketInventory);
                    let backpackInventory: IWebInventory = null;
                    if (player.character.backpackInventory) {
                        backpackInventory = Inventory.createWebinventory(player.character.backpackInventory);
                    }
                    EmitClient(player, 'inventory:Open', pocketInventory, backpackInventory);
                    player.inventoryOpen = true;
                }
                break;
            case 69:
                let droppedItem = DroppedItems.nearestDroppedItem(player.pos);
                if (!droppedItem || droppedItem.distance > 1.5) return;
                DroppedItems.removeDroppedItem(droppedItem.droppedItem.meta.droppedItemId);
                player.addItemToPockets(
                    player,
                    droppedItem.droppedItem.meta.item.id,
                    droppedItem.droppedItem.meta.item.amount
                );
                if (player.inventoryOpen) {
                    let pocketInventory: IWebInventory = Inventory.createWebinventory(player.character.pocketInventory);
                    let backpackInventory: IWebInventory = null;
                    if (player.character.backpackInventory) {
                        backpackInventory = Inventory.createWebinventory(player.character.backpackInventory);
                    }
                    EmitClient(player, 'inventory:Update', pocketInventory, backpackInventory);
                }
                break;
            default:
                break;
        }
    }

    @OnClient('keyManager:KeyDown')
    static keyDown(player: alt.Player, key: number): void {
        if (!player.character) return;
        switch (key) {
            default:
                break;
        }
    }
}
