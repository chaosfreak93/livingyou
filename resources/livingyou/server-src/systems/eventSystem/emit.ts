import * as alt from 'alt-server';
import { ISystemEvents } from '../../../shared/enums/system';

export function EmitClient(player: alt.Player, eventName: keyof ISystemEvents, ...args: any[]): void {
    alt.emitClient(player, eventName, ...args);
}

export function EmitAllClient(eventName: keyof ISystemEvents, ...args: any[]): void {
    alt.emitAllClients(eventName, ...args);
}

export default {
    EmitClient,
    EmitAllClient
};
