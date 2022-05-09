import * as alt from 'alt-client';
import { SYSTEM_EVENTS } from '../../shared/enums/system';

const tickEvery = 5000;

alt.onServer(SYSTEM_EVENTS.PLAYER_START_TICKS, startTick);

function startTick() {
    alt.setInterval(() => {
        alt.emitServer(SYSTEM_EVENTS.PLAYER_TICK);
    }, tickEvery);
}
