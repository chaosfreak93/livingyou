import * as alt from 'alt-server';
import { SYSTEM_EVENTS } from '../../shared/enums/system';

const timeBetweenTicks = 4950;

alt.onClient(SYSTEM_EVENTS.PLAYER_TICK, handleTick);

function handleTick(player: alt.Player): void {
    if (!player.nextTickTime) {
        player.nextTickTime = Date.now() + timeBetweenTicks;
    }

    if (Date.now() < player.nextTickTime) {
        return;
    }

    player.nextTickTime = Date.now() + timeBetweenTicks;

    player.time(player);
    player.weather(player);
}
