import * as alt from 'alt-client';
import * as native from 'natives';

alt.on('disconnect', async () => {
    native.stopAudioScenes();
    //native.freezeEntityPosition(alt.Player.local.scriptID, false);
});
