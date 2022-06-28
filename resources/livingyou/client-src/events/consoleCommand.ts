import * as alt from 'alt-client';
import { EmitServer } from '../systems/eventSystem/emit';

alt.on('consoleCommand', (name: string, ...args: string[]) => {
    switch (name) {
        case 'sv':
            EmitServer('devTools:SpawnVehicle', args[0]);
            break;
        case 'dv':
            if (!alt.Player.local.vehicle) return;
            EmitServer('devTools:DeleteVehicle');
    }
});
