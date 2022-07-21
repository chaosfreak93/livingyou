import * as alt from 'alt-shared';
import ICharacterAppearence from './ICharacterAppearence';
import ICharacterClothing from './ICharacterClothing';
import IInventory from './IInventory';
import IPlayerVehicle from './IPlayerVehicle';

export default interface ICharacter {
    id: string;
    firstName: string;
    secondName?: string;
    lastName: string;
    birthday: string;
    alive: boolean;
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
    pocketInventory: IInventory;
    backpackInventory?: IInventory;
    vehicles?: IPlayerVehicle[];
}
