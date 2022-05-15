import * as alt from 'alt-server';

alt.on('playerDeath', (player: alt.Player, killer: alt.Entity, weaponHash: number) => {
    player.spawn(player.pos);
});