import * as alt from 'alt-server';
import ICharacterAppearence from './ICharacterAppearence';
import ICharacterClothing from './ICharacterClothing';

export default interface ICharacter {
    firstName: string;
    secondName?: string;
    alive: boolean;
    lastName: string;
    characterAppearence: ICharacterAppearence;
    characterClothing: ICharacterClothing;
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