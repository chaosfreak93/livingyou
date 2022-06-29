import * as alt from 'alt-server';
import { On } from '../systems/eventSystem/on';

export default class PlayerDeath {
    @On('playerDeath')
    static playerDeath(player: alt.Player, killer: alt.Entity, weaponHash: number) {
        player.spawn(player.pos);
    }
}
