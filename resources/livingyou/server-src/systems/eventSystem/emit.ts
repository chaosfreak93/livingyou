import * as alt from 'alt-server';
import { ISystemEvents } from '../../../shared/interface/ISystemEvents';

export function EmitClient(player: alt.Player, eventName: keyof ISystemEvents, ...args: any[]): void {
    alt.emitClientRaw(player, eventName, ...args);
}

export function EmitAllClient(eventName: keyof ISystemEvents, ...args: any[]): void {
    alt.emitAllClientsRaw(eventName, ...args);
}

export default {
    EmitClient,
    EmitAllClient,
};
