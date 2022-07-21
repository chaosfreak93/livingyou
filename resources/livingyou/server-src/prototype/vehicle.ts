import * as alt from 'alt-server';
import IPlayerVehicle from '../../shared/interface/IPlayerVehicle';

declare module 'alt-server' {
    export interface Vehicle {
        vehicleData: IPlayerVehicle;

        setFuelLevel(fuel: number): void;
        getFuelLevel(): number;
        setOilLevel(oil: number): void;
        getOilLevel(): number;
    }
}

alt.Vehicle.prototype.setFuelLevel = function setFuelLevel(fuel: number): void {
    this.setStreamSyncedMeta('fuelLevel', fuel);
};

alt.Vehicle.prototype.getFuelLevel = function getFuelLevel(): number {
    return this.getStreamSyncedMeta('fuelLevel') as number;
};

alt.Vehicle.prototype.setOilLevel = function setOilLevel(oil: number): void {
    this.setStreamSyncedMeta('oilLevel', oil);
};

alt.Vehicle.prototype.getOilLevel = function getOilLevel(): number {
    return this.getStreamSyncedMeta('oilLevel') as number;
};
