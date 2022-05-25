import * as alt from 'alt-server';
import { OnServer } from '../../client-src/systems/eventSystem/on';
import { EmitClient } from './eventSystem/emit';

export default class KeyManager {
    @OnServer('keyManager:KeyUp')
    static keyUp(player: alt.Player, key: number): void {
        switch (key) {
            case 112:
                EmitClient(player, 'debug');
                break;
            case 73:
                break;
            default:
                break;
        }
    }

    @OnServer('keyManager:KeyDown')
    static keyDown(player: alt.Player, key: number): void {
        switch (key) {
            default:
                break;
        }
    }
}
