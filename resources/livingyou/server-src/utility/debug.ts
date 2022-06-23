import * as alt from 'alt-server';
import { OnClient } from '../systems/eventSystem/on';

export default class Debug {
    @OnClient('devTools:SpawnVehicle')
    static spawnVehicle(player: alt.Player, hash: string) {
        try {
            let vehicle = new alt.Vehicle(
                hash,
                player.pos.x,
                player.pos.y,
                player.pos.z,
                player.rot.x,
                player.rot.y,
                player.rot.z
            );
            vehicle.dimension = 0;
            player.setIntoVehicle(vehicle, 1);
        } catch (err) {
            alt.logError(err);
        }
    }
}
