import { EmitServer } from '../systems/eventSystem/emit';
import { On } from '../systems/eventSystem/on';

export default class KeyManager {
    @On('keyup')
    static keyup(key: number) {
        EmitServer('keyManager:KeyUp', key);
    }

    @On('keydown')
    static keydown(key: number) {
        EmitServer('keyManager:KeyDown', key);
    }
}
