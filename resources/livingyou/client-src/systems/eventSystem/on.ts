import * as alt from 'alt-client';
import { ISystemEvents } from '../../../shared/interface/ISystemEvents';

export function On(eventName: keyof alt.IClientEvent): Function {
    return (target: Object, _propertyKey: string, descriptor: PropertyDescriptor) => {
        alt.on(eventName, descriptor.value);
    };
}

export function OnServer(eventName: keyof ISystemEvents): Function {
    return (target: Object, _propertyKey: string, descriptor: PropertyDescriptor) => {
        alt.onServer(eventName, descriptor.value);
    };
}

export default {
    On,
    OnServer,
};
