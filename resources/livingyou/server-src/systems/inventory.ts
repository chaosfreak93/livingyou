import * as alt from 'alt-server';
import IInventoryItem from '../../shared/interface/IInventoryItem';
import { OnClient } from './eventSystem/on';
import Items from './items';

export default class Inventory {
    @OnClient('inventory:UseItem')
    static useItem(player: alt.Player, inventory: number, inventoryItem: IInventoryItem) {
        switch (inventory) {
            case 0:
                let item = Items.getItemById(inventoryItem.id);
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
}
