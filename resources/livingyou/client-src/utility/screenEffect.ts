import * as native from 'natives';
import { OnServer } from '../systems/eventSystem/on';

export default class ScreenEffect {
    @OnServer('player:StartScreenEffect')
    static startScreenEffect(effectName: string, duration: number, looped: boolean): void {
        native.animpostfxPlay(effectName, duration, looped);
    }

    @OnServer('player:StopScreenEffect')
    static stopScreenEffect(effectName: string): void {
        native.animpostfxStop(effectName);
    }

    @OnServer('player:StopAllScreenEffects')
    static stopAllScreenEffects(): void {
        native.animpostfxStopAll();
    }
}
