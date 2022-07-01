import IInventory from './IInventory';

export default interface IPlayerVehicle {
    id: string;
    vehicleId: string;
    data: {
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
