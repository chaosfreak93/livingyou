import ICharacter from '../../shared/interface/ICharacter';

export default interface IAccount {
    _id?: any;
    discord: number;
    email: string;
    firstJoinTimestamp: number;
    lastJoinTimestamp?: number;
    allowSecondCharacter: boolean;
    character: ICharacter[];
    banned: boolean;
    reason?: string;
}
