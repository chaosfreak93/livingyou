import * as alt from 'alt-server';

export class World {
    static hour: number = 1;
    static minute: number = 0;

    static updateWorldTime(): void {
        const time = new Date(Date.now());
        World.minute = time.getMinutes();
        World.hour = time.getHours();
    }

    static getWorldHour() {
        return World.hour;
    }

    static getWorldMinute() {
        return World.minute;
    }
}

alt.setInterval(World.updateWorldTime, 60000);
World.updateWorldTime();
