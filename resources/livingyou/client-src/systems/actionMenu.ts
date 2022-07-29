import * as alt from 'alt-client';
import { OnServer } from './eventSystem/on';

export default class ActionMenu {
    @OnServer('actionMenu:OpenInVehicleActions')
    static openInVehicleActions(vehicleId: number): void {
        alt.log(`OpenInVehicleActions: ${vehicleId}`);
    }

    @OnServer('actionMenu:OpenVehicleActions')
    static openVehicleActions(vehicleId: number): void {
        alt.log(`OpenVehicleActions: ${vehicleId}`);
    }

    @OnServer('actionMenu:OpenPlayerActions')
    static openPlayerActions(playerId: number): void {
        alt.log(`OpenPlayerActions: ${playerId}`);
    }

    @OnServer('actionMenu:CloseActions')
    static closeActions(): void {
        alt.log('CloseActions');
    }
}
