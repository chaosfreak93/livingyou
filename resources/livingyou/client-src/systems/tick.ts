import * as alt from 'alt-client';
import { EmitServer } from './eventSystem/emit';
import { OnServer } from './eventSystem/on';

const tickEvery: number = 5000;

export default class PlayerTick {
    @OnServer('player:StartTicks')
    static startTick(): void {
        alt.setInterval(() => {
            EmitServer('player:Tick');
        }, tickEvery);
    }
}
