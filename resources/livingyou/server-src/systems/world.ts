import * as alt from 'alt-server';

const worldDivision: number = 6;
const maxY: number = 8000;
const minY: number = -4000;
const WEATHER_ROTATION: string[] = [
    'EXTRASUNNY',
    'EXTRASUNNY',
    'CLEAR',
    'CLOUDS',
    'OVERCAST',
    'RAIN',
    'THUNDER',
    'RAIN',
    'FOGGY',
    'OVERCAST',
    'CLEARING',
];

export class World {
    static minMaxGroups: Array<{ minY: number; maxY: number }>;
    static hour: number = 1;
    static minute: number = 0;

    static generateGrid(division: number): void {
        let groups: Array<{ minY: number; maxY: number }> = [];
        let total: number = maxY + Math.abs(minY);

        for (let i = 0; i < division; i++) {
            const result = {
                maxY: maxY - (total / division) * i,
                minY: maxY - 2000 - (total / division) * i,
            };

            groups.push(result);
        }

        World.minMaxGroups = groups;
    }

    static updateWorldTime(): void {
        const time: Date = new Date(Date.now());
        World.minute = time.getMinutes();
        World.hour = time.getHours();

        if (World.minute !== 30 && World.minute !== 0) {
            return;
        }

        const endElement: string = WEATHER_ROTATION.pop();
        WEATHER_ROTATION.unshift(endElement);
    }

    static getGridSpace(player: alt.Player): number {
        const gridSpace: number = World.minMaxGroups.findIndex(
            (pos) => player && player.valid && player.pos.y > pos.minY && player.pos.y < pos.maxY
        );

        return gridSpace === -1 ? 0 : gridSpace;
    }

    static getWeatherByGrid(gridIndex: number): string {
        return WEATHER_ROTATION[gridIndex];
    }

    static getWorldHour() {
        return World.hour;
    }

    static getWorldMinute() {
        return World.minute;
    }
}

alt.setInterval(World.updateWorldTime, 60000);
World.generateGrid(worldDivision);
World.updateWorldTime();
