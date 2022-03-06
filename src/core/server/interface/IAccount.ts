import ICharacterAppearence from "./ICharacterAppearence";
import ICharacterData from "./ICharacterData";

export default interface IAccount {
    _id?: any;
    discord: number;
    email: string;
    firstJoinTimestamp: number;
    lastJoinTimestamp: number;
    characterAppearence?: ICharacterAppearence;
    characterData?: ICharacterData;
    banned: boolean;
    reason?: string;
}