import * as alt from 'alt-client';
import * as native from 'natives';
import { SYSTEM_EVENTS } from '../../shared/enums/system';

export class World {
    static previousWeather = 'Overcast';
    static weather: string;
    static hour: number = 0;
    static minute: number = 0;

    static updateWorldTime(hour: number, minute: number) {
        native.pauseClock(true);

        World.hour = hour;
        World.minute = minute;
        native.setClockTime(hour, minute, 0);
    }

    static updateWeather(name: string) {
        World.weather = name;

        if (World.weather !== World.previousWeather) {
            native.setWeatherTypeOvertimePersist(World.weather, 30);
            World.previousWeather = World.weather;
        }
    }
}

alt.onServer(SYSTEM_EVENTS.WORLD_UPDATE_TIME, World.updateWorldTime);
alt.onServer(SYSTEM_EVENTS.WORLD_UPDATE_WEATHER, World.updateWeather);
