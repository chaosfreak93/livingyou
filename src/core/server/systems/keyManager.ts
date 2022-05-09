import * as alt from 'alt-server';
import { SYSTEM_EVENTS } from '../../shared/enums/system';

export default class KeyManager {
    static keyUp(player: alt.Player, key: number): void {
        switch (key) {
            case 112:
                alt.emitClient(player, SYSTEM_EVENTS.DEBUG);
                break;
            default:
                break;
        }
    }

    static keyDown(player: alt.Player, key: number): void {
        switch (key) {
            default:
                break;
        }
    }
}

alt.onClient(SYSTEM_EVENTS.KEY_MANAGER_KEY_UP, KeyManager.keyUp);
alt.onClient(SYSTEM_EVENTS.KEY_MANAGER_KEY_DOWN, KeyManager.keyDown);
