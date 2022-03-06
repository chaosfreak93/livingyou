import * as alt from 'alt-server';

export default interface ICharacterData {
    firstName: string;
    lastName: string;
    phoneNumber?: number;
    lastKnownLocation?: {
        position: alt.Vector3;
        rotation: alt.Vector3;
    };
    money: {
        hand: number;
        bank: number;
    };
}