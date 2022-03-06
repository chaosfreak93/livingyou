import * as alt from 'alt-server';
import { login } from '../systems/login';

alt.on('playerConnect', async (player: alt.Player) => {
    if (!player || !player.valid) {
        return;
    }

    if (player.name == "Player") {
        player.kick("Bitte ändere deinen Nutzernamen!");
    }
    
    player.model = 'MP_M_Freemode_01';

    player.invincible = true;
    player.spawn(-1645.55, -1113.04, 12.65);
    alt.setTimeout(() => {
        player.despawn();
        player.invincible = false;
    }, 100);

    await login(player);
});