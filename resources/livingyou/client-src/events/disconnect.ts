import * as alt from 'alt-client';
import * as native from 'natives';
import { On } from '../systems/eventSystem/on';

export default class Disconnect {
    @On('disconnect')
    static disconnect() {
        native.stopAudioScenes();
        native.freezeEntityPosition(alt.Player.local.scriptID, false);
    }
}
