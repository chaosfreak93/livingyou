import * as alt from 'alt-server';
import ICharacterAppearence from './ICharacterAppearence';

export default interface ICharacter {
    firstName: string;
    secondName?: string;
    lastName: string;
    characterAppearence: ICharacterAppearence;
    phoneNumber?: number;
    lastKnownLocation?: {
        position: alt.Vector3;
        rotation: alt.Vector3;
    };
    money: {
        hand: number;
        bank: number;
    };
    hunger: number;
    thirst: number;
}