import * as alt from 'alt-client';
import { EmitServer } from '../systems/eventSystem/emit';
import { On } from '../systems/eventSystem/on';

export default class ConsoleCommand {
    @On('consoleCommand')
    static consoleCommand(name: string, ...args: string[]): void {
        switch (name) {
            case 'sv':
                EmitServer('devTools:SpawnVehicle', args[0]);
                break;
            case 'dv':
                if (!alt.Player.local.vehicle) return;
                EmitServer('devTools:DeleteVehicle');
        }
    }
}
