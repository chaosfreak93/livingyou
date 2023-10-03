import * as alt from 'alt-server';
import { ISystemEvents } from '../../../shared/interface/ISystemEvents';

export function On(eventName: keyof alt.IServerEvent): Function {
    return (target: Object, _propertyKey: string, descriptor: PropertyDescriptor) => {
        alt.on(eventName, descriptor.value);
    };
}

export function OnClient(eventName: keyof ISystemEvents): Function {
    return (target: Object, _propertyKey: string, descriptor: PropertyDescriptor) => {
        alt.onClient(eventName, descriptor.value);
    };
}

export function OnRPC(eventName: keyof alt.IServerEvent): Function {
    return (target: Object, _propertyKey: string, descriptor: PropertyDescriptor) => {
        alt.onRpc(eventName, descriptor.value);
    };
}

export default {
    On,
    OnClient,
    OnRPC
};
