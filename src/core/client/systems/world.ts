import * as alt from 'alt-client';
import * as native from 'natives';
import { SYSTEM_EVENTS } from '../../shared/enums/system';

export class World {
    static hour: number = 0;
    static minute: number = 0;

    static updateWorldTime(hour: number, minute: number) {
        World.hour = hour;
        World.minute = minute;
        native.setClockTime(hour, minute, 0);
    }
}

alt.onServer(SYSTEM_EVENTS.WORLD_UPDATE_TIME, World.updateWorldTime);
