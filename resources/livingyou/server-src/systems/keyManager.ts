import * as alt from 'alt-server';
import { EmitClient } from './eventSystem/emit';
import { OnClient } from './eventSystem/on';

export default class KeyManager {
    @OnClient('keyManager:KeyUp')
    static keyUp(player: alt.Player, key: number): void {
        switch (key) {
            case 112:
                EmitClient(player, 'debug');
                break;
            case 73:
                EmitClient(player, 'inventory:Open', player.character.pocketInventory);
                break;
            default:
                break;
        }
    }

    @OnClient('keyManager:KeyDown')
    static keyDown(player: alt.Player, key: number): void {
        switch (key) {
            default:
                break;
        }
    }
}
