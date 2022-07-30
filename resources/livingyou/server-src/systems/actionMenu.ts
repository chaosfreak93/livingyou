import * as alt from 'alt-server';
import { OnClient } from './eventSystem/on';

export default class ActionMenu {
    @OnClient('actionMenu:ProceedAction')
    static proceedAction(eventPlayer: alt.Player, menuType: string, menuAction: string, entityId: number): void {
        if (menuType === 'inVehicle') {
            let inVehicle = alt.Vehicle.getByID(entityId);
            switch (menuAction) {
                case 'toggleEngine':
                    if (!inVehicle || inVehicle.driver !== eventPlayer) return;
                    inVehicle.engineOn = !inVehicle.engineOn;
                    break;
                case 'changeLockState':
                    alt.VehicleLockState.LockPlayerInside
                    if (inVehicle.lockState === 1) {
                        inVehicle.lockState = 2;
                    } else {
                        inVehicle.lockState = 1;
                    }
                    break;
            }
        } else if (menuType === 'vehicle') {
            let vehicle = alt.Vehicle.getByID(entityId);
            switch (menuAction) {
                case 'changeLockState':
                    if (vehicle.lockState === 1) {
                        vehicle.lockState = 2;
                    } else {
                        vehicle.lockState = 1;
                    }
                    break;
            }
        } else if (menuType === 'player') {
            let player = alt.Player.getByID(entityId);
        }
    }
}
