import * as alt from 'alt-server';
import { login } from '../systems/login';

alt.on('playerConnect', async (player: alt.Player) => {
    await login(player);
});