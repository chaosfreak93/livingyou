import * as alt from 'alt-server';
import IItem from '../../shared/interface/IItem';
import DroppedItems from './droppedItems';
import { OnClient } from './eventSystem/on';
import Items from './items';

export default class Inventory {
    @OnClient('inventory:UseItem')
    static useItem(player: alt.Player, inventory: number, inventoryItem: IItem) {
        switch (inventory) {
            case 0:
                let item = Items.getItemById(inventoryItem.id);
                if (!item) return;
                player.removeItemById(player, inventoryItem.id, 1);

                if (item.data.food) {
                    player.updateFood(player, item.data.food);
                }

                if (item.data.thirst) {
                    player.updateThirst(player, item.data.thirst);
                }

                if (item.data.screenEffect) {
                    player.startScreenEffect(
                        player,
                        item.data.screenEffect.name,
                        item.data.screenEffect.duration,
                        item.data.screenEffect.looped
                    );
                }
                break;
            case 1:
                item = Items.getItemById(inventoryItem.id);
                if (!item) return;

                if (item.data.food) {
                    player.updateFood(player, item.data.food);
                }

                if (item.data.thirst) {
                    player.updateThirst(player, item.data.thirst);
                }

                if (item.data.screenEffect) {
                    player.startScreenEffect(
                        player,
                        item.data.screenEffect.name,
                        item.data.screenEffect.duration,
                        item.data.screenEffect.looped
                    );
                }
                break;
        }
    }

    @OnClient('inventory:DropItem')
    static dropItem(player: alt.Player, inventory: number, inventoryItem: IItem) {
        switch (inventory) {
            case 0:
                let item = Items.getItemById(inventoryItem.id);
                player.removeItemById(player, inventoryItem.id);
                DroppedItems.addDroppedItem(
                    new alt.Vector3(player.pos.x, player.pos.y, player.pos.z - 1),
                    player.rot.toDegrees(),
                    item.data.model,
                    // @ts-ignore
                    { amount: inventoryItem.amount, id: inventoryItem.id }
                );
                break;
            case 1:
                DroppedItems.addDroppedItem(
                    new alt.Vector3(player.pos.x, player.pos.y, player.pos.z - 1),
                    player.rot.toDegrees(),
                    item.data.model,
                    // @ts-ignore
                    { amount: inventoryItem.amount, id: inventoryItem.id }
                );
                break;
        }
    }
}
