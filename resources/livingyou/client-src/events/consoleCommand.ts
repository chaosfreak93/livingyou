import * as alt from 'alt-client';
import { EmitServer } from '../systems/eventSystem/emit';

alt.on('consoleCommand', (name: string, ...args: string[]) => {
    if (name == 'sv') {
        EmitServer('devTools:SpawnVehicle', alt.hash(args[0]));
    }
});
