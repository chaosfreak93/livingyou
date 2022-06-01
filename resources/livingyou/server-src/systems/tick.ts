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
    
        player.character.lastKnownLocation = {
            position: player.pos,
            rotation: player.rot
        }
    }
}


