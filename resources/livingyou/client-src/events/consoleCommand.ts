import * as alt from 'alt-client';

alt.on('consoleCommand', (name: string, ...args: string[]) => {
    if (name == 'pos') {
        alt.log('Position: ' + alt.Player.local.pos);
        alt.log('Rotaion: ' + alt.Player.local.rot);
    }
});
