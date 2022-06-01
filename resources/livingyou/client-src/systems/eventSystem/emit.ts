import * as alt from 'alt-client';
import { ISystemEvents } from '../../../shared/enums/system';

export function EmitServer(eventName: keyof ISystemEvents, ...args: any[]): void {
    alt.emitServer(eventName, ...args);
}

export default {
    EmitServer,
};
