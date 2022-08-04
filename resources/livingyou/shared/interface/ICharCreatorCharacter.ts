import ICharacterAppearence from './ICharacterAppearence';
import ICharacterClothe from './ICharacterClothe';
import ICharacterProp from './ICharacterProp';

export default interface ICharCreatorCharacter {
    firstName: string;
    secondName?: string;
    lastName: string;
    birthday: string;
    characterAppearence: ICharacterAppearence;
    characterClothing: {
        clothes: [
            ICharacterClothe,
            ICharacterClothe,
            ICharacterClothe,
            ICharacterClothe,
            ICharacterClothe,
            ICharacterClothe,
            ICharacterClothe,
            ICharacterClothe,
            ICharacterClothe,
            ICharacterClothe,
            ICharacterClothe,
            ICharacterClothe
        ];
        props: [ICharacterProp, ICharacterProp, ICharacterProp, ICharacterProp, ICharacterProp];
    };
}
