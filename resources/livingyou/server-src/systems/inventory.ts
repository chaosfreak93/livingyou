import * as alt from 'alt-server';
import IInventory from '../../shared/interface/IInventory';
import IItem from '../../shared/interface/IItem';
import IWebInventory from '../../shared/interface/IWebInventory';
import DroppedItems from './droppedItems';
import { EmitClient } from './eventSystem/emit';
import { OnClient } from './eventSystem/on';
import Items from './items';

export default class Inventory {
    @OnClient('inventory:UseItem')
    static useItem(player: alt.Player, inventory: number, inventoryItem: IItem): void {
        let item: IItem = Items.getItemById(inventoryItem.id);
        if (!item) return;
        switch (inventory) {
            case 0:
                player.removeItemFromPockets(inventoryItem.id, 1);

                if (item.data.food) {
                    player.updateFood(item.data.food);
                }

                if (item.data.thirst) {
                    player.updateThirst(item.data.thirst);
                }

                if (item.data.screenEffect) {
                    player.startScreenEffect(
                        item.data.screenEffect.name,
                        item.data.screenEffect.duration,
                        item.data.screenEffect.looped
                    );
                }
                break;
            case 1:
                player.removeItemFromBackpack(inventoryItem.id, 1);

                if (item.data.food) {
                    player.updateFood(item.data.food);
                }

                if (item.data.thirst) {
                    player.updateThirst(item.data.thirst);
                }

                if (item.data.screenEffect) {
                    player.startScreenEffect(
                        item.data.screenEffect.name,
                        item.data.screenEffect.duration,
                        item.data.screenEffect.looped
                    );
                }
                break;
        }
        let pocketInventory: IWebInventory = Inventory.createWebinventory(player.character.pocketInventory);
        let backpackInventory: IWebInventory = null;
        if (player.character.backpackInventory) {
            backpackInventory = Inventory.createWebinventory(player.character.backpackInventory);
        }
        EmitClient(player, 'inventory:Update', pocketInventory, backpackInventory);
    }

    @OnClient('inventory:DropItem')
    static dropItem(player: alt.Player, inventory: number, inventoryItem: IItem): void {
        let item: IItem = Items.getItemById(inventoryItem.id);
        if (!item) return;
        switch (inventory) {
            case 0:
                player.removeItemFromPockets(inventoryItem.id);
                DroppedItems.addDroppedItem(
                    new alt.Vector3(player.pos.x, player.pos.y, player.pos.z - 1),
                    player.rot.toDegrees(),
                    item.data.model,
                    // @ts-ignore
                    { amount: inventoryItem.amount, id: inventoryItem.id }
                );
                break;
            case 1:
                player.removeItemFromBackpack(inventoryItem.id);
                DroppedItems.addDroppedItem(
                    new alt.Vector3(player.pos.x, player.pos.y, player.pos.z - 1),
                    player.rot.toDegrees(),
                    item.data.model,
                    // @ts-ignore
                    { amount: inventoryItem.amount, id: inventoryItem.id }
                );
                break;
        }
        let pocketInventory: IWebInventory = Inventory.createWebinventory(player.character.pocketInventory);
        let backpackInventory: IWebInventory = null;
        if (player.character.backpackInventory) {
            backpackInventory = Inventory.createWebinventory(player.character.backpackInventory);
        }
        EmitClient(player, 'inventory:Update', pocketInventory, backpackInventory);
    }

    static createWebinventory(inventory: IInventory): IWebInventory {
        let webInventory: IWebInventory = {
            currentWeight: Inventory.calculateInventoryWeight(inventory),
            maxWeight: inventory.maxWeight,
            items: [],
        };
        for (let i = 0; i < inventory.items.length; i++) {
            let item: IItem = Items.getItemById(inventory.items[i].id);
            webInventory.items.push({
                item: item,
                amount: inventory.items[i].amount,
            });
        }
        return webInventory;
    }

    static calculateInventoryWeight(inventory: IInventory): number {
        let weight: number = 0;
        for (let i = 0; i < inventory.items.length; i++) {
            for (let j = 0; j < inventory.items[i].amount; j++) {
                weight += Items.getItemById(inventory.items[i].id).weight;
            }
        }
        return parseFloat(weight.toFixed(2));
    }
}
