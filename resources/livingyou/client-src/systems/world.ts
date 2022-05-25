import * as alt from 'alt-client';
import * as native from 'natives';
import { OnServer } from './eventSystem/on';

export class World {
    static previousWeather = 'Overcast';
    static weather: string;
    static hour: number = 0;
    static minute: number = 0;
    static seconds: number = 0;

    @OnServer('world:UpdateTime')
    static updateWorldTime(hour: number, minute: number) {
        if (alt.getMsPerGameMinute() !== 60000) alt.setMsPerGameMinute(60000);

        World.hour = hour;
        World.minute = minute;
        World.seconds = native.getClockSeconds();
        native.setClockTime(World.hour, World.minute, World.seconds);
    }

    @OnServer('world:UpdateWeather')
    static updateWeather(name: string) {
        World.weather = name;

        if (World.weather !== World.previousWeather) {
            native.setWeatherTypeOvertimePersist(World.weather, 30);
            World.previousWeather = World.weather;
        }
    }
}
