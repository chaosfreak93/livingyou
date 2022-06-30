import * as alt from 'alt-server';

declare module 'alt-server' {
    export interface Vehicle {
        oilLevel: number;
        fuelLevel: number;
        engineTemperature: number;
    }
}
