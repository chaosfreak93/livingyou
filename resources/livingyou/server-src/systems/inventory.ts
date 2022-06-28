import * as alt from 'alt-server';
import IInventoryItem from '../../shared/interface/IInventoryItem';
import { OnClient } from './eventSystem/on';

export default class Inventory {
    @OnClient('inventory:UseItem')
    static useItem(player: alt.Player, inventory: number, item: IInventoryItem) {
        switch (inventory) {
            case 0:
                player.removeItemById(player, item.id, 1);

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
