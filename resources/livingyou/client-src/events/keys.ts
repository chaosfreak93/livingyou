import * as alt from 'alt-client';
import { EmitServer } from '../systems/eventSystem/emit';
import { On } from '../systems/eventSystem/on';

export default class KeyManager {
    @On('keyup')
    static keyup(key: number) {
        if (alt.isMenuOpen || alt.isConsoleOpen) return;
        EmitServer('keyManager:KeyUp', key);
    }

    @On('keydown')
    static keydown(key: number) {
        if (alt.isMenuOpen || alt.isConsoleOpen) return;
        EmitServer('keyManager:KeyDown', key);
    }
}
