import * as alt from 'alt-server';

declare module 'alt-server' {
    export interface Vehicle {
        oilLevel: number;
        fuelLevel: number;
        engineTemperature: number;

        setFuelLevel(fuel: number): void;
    }
}

alt.Vehicle.prototype.setFuelLevel = function setFuelLevel(fuel: number) {
    this.setStreamSyncedMeta('fuelLevel', fuel);
};
