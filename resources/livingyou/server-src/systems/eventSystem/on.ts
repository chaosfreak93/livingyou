import * as alt from 'alt-server';
import { ISystemEvents } from '../../../shared/enums/system';

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

export default {
    On,
    OnClient,
};
