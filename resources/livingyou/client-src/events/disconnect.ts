import * as alt from 'alt-client';
import * as native from 'natives';

alt.on('resourceStop', async () => {
    native.stopAudioScenes();
    native.freezeEntityPosition(alt.Player.local.scriptID, false);
});
