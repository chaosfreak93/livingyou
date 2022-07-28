import * as alt from 'alt-server';

export function nearestEntity(sourceEntity: alt.Entity): { entity: alt.Entity; distance: number } {
    const entitys: readonly alt.Entity[] = alt.Entity.all;
    let distance: number;
    let entity: alt.Entity;
    for (let i = 0; i < entitys.length; i++) {
        let entityPos: alt.Vector3 = entitys[i].pos;
        let newDistance: number = sourceEntity.pos.distanceTo(entityPos);
        if (distance == undefined || distance >= newDistance) {
            distance = newDistance;
            entity = entitys[i];
        }
    }
    if (!entity) return null;
    return { entity, distance };
}

export function nearestPlayer(sourceEntity: alt.Entity): { player: alt.Player; distance: number } {
    const players: readonly alt.Player[] = alt.Player.all;
    let distance: number;
    let player: alt.Player;
    for (let i = 0; i < players.length; i++) {
        let playerPos: alt.Vector3 = players[i].pos;
        let newDistance: number = sourceEntity.pos.distanceTo(playerPos);
        if (distance == undefined || distance >= newDistance) {
            distance = newDistance;
            player = players[i];
        }
    }
    if (!player) return null;
    return { player, distance };
}

export function nearestVehicle(sourceEntity: alt.Entity): { vehicle: alt.Vehicle; distance: number } {
    const vehicles: readonly alt.Vehicle[] = alt.Vehicle.all;
    let distance: number;
    let vehicle: alt.Vehicle;
    for (let i = 0; i < vehicles.length; i++) {
        let vehiclePos: alt.Vector3 = vehicles[i].pos;
        let newDistance: number = sourceEntity.pos.distanceTo(vehiclePos);
        if (distance == undefined || distance >= newDistance) {
            distance = newDistance;
            vehicle = vehicles[i];
        }
    }
    if (!vehicle) return null;
    return { vehicle, distance };
}

export default {
    nearestEntity,
    nearestPlayer,
    nearestVehicle,
};
