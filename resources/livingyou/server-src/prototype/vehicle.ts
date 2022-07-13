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

alt.Vehicle.prototype.setFuelLevel = function setFuelLevel(fuel: number) {
    this.setStreamSyncedMeta('fuelLevel', fuel);
};

alt.Vehicle.prototype.getFuelLevel = function getFuelLevel() {
    return this.getStreamSyncedMeta('fuelLevel') as number;
};

alt.Vehicle.prototype.setOilLevel = function setOilLevel(oil: number) {
    this.setStreamSyncedMeta('oilLevel', oil);
};

alt.Vehicle.prototype.getOilLevel = function getOilLevel() {
    return this.getStreamSyncedMeta('oilLevel') as number;
};
