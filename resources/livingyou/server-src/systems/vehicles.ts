import * as alt from 'alt-server';
import Database from '@stuyk/ezmongodb';
import IVehicle from '../../shared/interface/IVehicle';
import { On } from './eventSystem/on';
import { EmitClient } from './eventSystem/emit';

export default class Vehicles {
    static vehicles: IVehicle[];

    static getVehicleByHash(hash: string): IVehicle | undefined {
        return Vehicles.vehicles.find((value: IVehicle) => value.hash === hash);
    }

    static async fetchVehicles(): Promise<void> {
        Vehicles.vehicles = await Database.fetchAllData<IVehicle>('vehicles');
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
