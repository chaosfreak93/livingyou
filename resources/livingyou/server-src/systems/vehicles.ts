import * as alt from 'alt-server';
import Database from '@stuyk/ezmongodb';
import IVehicle from '../../shared/interface/IVehicle';
import { On } from './eventSystem/on';
import { EmitClient } from './eventSystem/emit';
import IPlayerVehicle from '../../shared/interface/IPlayerVehicle';

export default class Vehicles {
    static vehicles: IVehicle[];

    static getVehicleByHash(hash: string): IVehicle | undefined {
        return Vehicles.vehicles.find((value: IVehicle) => value.hash === hash);
    }

    static async fetchVehicles(): Promise<void> {
        Vehicles.vehicles = await Database.fetchAllData<IVehicle>('vehicles');
    }

    static createVehicle(
        modelHash: number,
        pos: alt.Vector3,
        rot: alt.Vector3,
        engineOn: boolean,
        vehicleData?: IPlayerVehicle
    ): alt.Vehicle {
        let vehicle = new alt.Vehicle(modelHash, pos, rot);
        if (vehicleData) {
            vehicle.vehicleData = vehicleData;
            vehicle.setFuelLevel(vehicleData.data.fuelLevel);
            vehicle.setOilLevel(vehicleData.data.oilLevel);
            vehicle.numberPlateText = vehicleData.data.numberPlateText;
            vehicle.engineHealth = vehicleData.damage.engineDamage;
        }
        vehicle.engineOn = engineOn;
        return vehicle;
    }

    @On('playerEnteredVehicle')
    static playerEnteredVehicle(player: alt.Player, vehicle: alt.Vehicle, seat: number) {
        if (seat == 1) {
            EmitClient(player, 'hud:ShowDriveHud');
            vehicle.manualEngineControl = true;
        }
    }

    @On('playerChangedVehicleSeat')
    static playerChangedVehicleSeat(player: alt.Player, vehicle: alt.Vehicle, oldSeat: number, newSeat: number) {
        if (oldSeat == 1) {
            EmitClient(player, 'hud:HideDriveHud');
        }
        if (newSeat == 1) {
            EmitClient(player, 'hud:ShowDriveHud');
            vehicle.manualEngineControl = true;
        }
    }

    @On('playerLeftVehicle')
    static playerLeftVehicle(player: alt.Player, vehicle: alt.Vehicle, seat: number) {
        if (seat == 1) {
            EmitClient(player, 'hud:HideDriveHud');
        }
    }
}
