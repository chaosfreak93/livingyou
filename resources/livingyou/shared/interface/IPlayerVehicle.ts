import IInventory from './IInventory';

export default interface IPlayerVehicle {
    id: string;
    vehicleId: string;
    data: {
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
