import * as alt from 'alt-server';
import { EmitClient } from './eventSystem/emit';
import { OnClient } from './eventSystem/on';

export default class KeyManager {
    @OnClient('keyManager:KeyUp')
    static keyUp(player: alt.Player, key: number): void {
        switch (key) {
            case 112:
                EmitClient(player, 'devTools:debug');
                break;
            case 73:
                if (player.inventoryOpen) {
                    EmitClient(player, 'inventory:Close');
                    player.inventoryOpen = false;
                } else {
                    EmitClient(player, 'inventory:Open', player.character.pocketInventory);
                    player.inventoryOpen = true;
                }
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
