import * as alt from 'alt-server';
import { OnClient } from '../systems/eventSystem/on';
import Vehicles from '../systems/vehicles';

export default class Debug {
    @OnClient('devTools:SpawnVehicle')
    static async spawnVehicle(player: alt.Player, hash: string) {
        try {
            let vehicle = Vehicles.createVehicle(alt.hash(hash), player.pos, player.rot, true);
            vehicle.dimension = 0;
            vehicle.numberPlateText = 'ADMIN';
            player.setIntoVehicle(vehicle, 1);
        } catch (err) {
            alt.logError(err);
        }
    }

    @OnClient('devTools:DeleteVehicle')
    static deleteVehicle(player: alt.Player) {
        try {
            if (player.vehicle.driver !== player) return;
            Vehicles.deleteVehicle(player.vehicle);
        } catch (err) {
            alt.logError(err);
        }
    }
}
