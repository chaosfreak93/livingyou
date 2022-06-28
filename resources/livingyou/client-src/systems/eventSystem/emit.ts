import * as alt from 'alt-client';
import { ISystemEvents } from '../../../shared/interface/ISystemEvents';

export function EmitServer(eventName: keyof ISystemEvents, ...args: any[]): void {
    alt.emitServer(eventName, ...args);
}

export default {
    EmitServer,
};
