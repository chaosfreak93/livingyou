import * as alt from 'alt-server';
import IWebInventory from '../../shared/interface/IWebInventory';
import DroppedItems from './droppedItems';
import { EmitClient } from './eventSystem/emit';
import { OnClient } from './eventSystem/on';
import Items from './items';

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
                    player.calculateInventoryWeight(player);
                    let pocketInventory: IWebInventory = {
                        currentWeight: player.character.pocketInventory.currentWeight,
                        maxWeight: player.character.pocketInventory.maxWeight,
                        items: [],
                    };
                    let backpackInventory: IWebInventory = null;
                    for (let i = 0; i < player.character.pocketInventory.items.length; i++) {
                        let item = Items.getItemById(player.character.pocketInventory.items[i].id);
                        pocketInventory.items.push({
                            item: item,
                            amount: player.character.pocketInventory.items[i].amount,
                        });
                    }
                    if (player.character.backpackInventory) {
                        backpackInventory = {
                            currentWeight: player.character.backpackInventory.currentWeight,
                            maxWeight: player.character.backpackInventory.maxWeight,
                            items: [],
                        };
                        for (let i = 0; i < player.character.backpackInventory.items.length; i++) {
                            let item = Items.getItemById(player.character.backpackInventory.items[i].id);
                            backpackInventory.items.push({
                                item: item,
                                amount: player.character.backpackInventory.items[i].amount,
                            });
                        }
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
