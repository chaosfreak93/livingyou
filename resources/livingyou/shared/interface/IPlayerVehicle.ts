import * as alt from 'alt-shared';
import IInventory from './IInventory';

export default interface IPlayerVehicle {
    id: string;
    vehicleId: string;
    data: {
        locations: {
            lastPosition: alt.Vector3;
            currentPosition: alt.Vector3;
            currentRotation: alt.Vector3;
        };
        dimension: number; 
        fuelLevel: number;
        oilLevel: number;
        numberPlateText: string;
        vehicleInventory: IInventory;
    };
    damage: {
        engineDamage: number;
    };
    tuning: {
        appearence: {};
        performance: {
            engine: number;
        };
    };
}
