import * as alt from 'alt-client';
import { ISystemEvents } from '../../../shared/interface/ISystemEvents';

export function EmitServer(eventName: keyof ISystemEvents, ...args: any[]): void {
    alt.emitServerRaw(eventName, ...args);
}

export default {
    EmitServer,
};
