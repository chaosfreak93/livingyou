import * as alt from 'alt-server';
import { OnClient } from './eventSystem/on';

const timeBetweenTicks = 4950;

export default class PlayerTick {
    @OnClient('player:Tick')
    static handleTick(player: alt.Player): void {
        if (!player.nextTickTime) {
            player.nextTickTime = Date.now() + timeBetweenTicks;
        }

        if (Date.now() < player.nextTickTime) {
            return;
        }

        player.nextTickTime = Date.now() + timeBetweenTicks;

        player.time(player);
        player.weather(player);

        if (!player.character) return;
        if (player.screenEffect) {
            player.screenEffect.ticks -= 1;

            if (player.screenEffect.ticks <= 0) {
                player.stopScreenEffect(player, player.screenEffect.name);
            }
        }
    }
}
