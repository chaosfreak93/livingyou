import Database from '@stuyk/ezmongodb';
import IVehicle from '../../shared/interface/IVehicle';

export default class Vehicles {
    static vehicles: IVehicle[];

    static getVehicleByHash(hash: string): IVehicle | undefined {
        return Vehicles.vehicles.find((value: IVehicle) => value.hash === hash);
    }

    static async fetchVehicles(): Promise<void> {
        Vehicles.vehicles = await Database.fetchAllData<IVehicle>('vehicles');
    }
}
