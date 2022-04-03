export default interface ICharacterClothing {
    clothes: {
        head: {
            dlc: String;
            drawable: number;
            texture: number;
            palette?: number;
        };
        mask: {
            dlc: String;
            drawable: number;
            texture: number;
            palette?: number;
        };
        hairStyle: {
            dlc: String;
            drawable: number;
            texture: number;
            palette?: number;
        };
        torso: {
            dlc: String;
            drawable: number;
            texture: number;
            palette?: number;
        };
        legs: {
            dlc: String;
            drawable: number;
            texture: number;
            palette?: number;
        };
        bag: {
            dlc: String;
            drawable: number;
            texture: number;
            palette?: number;
        };
        shoes: {
            dlc: String;
            drawable: number;
            texture: number;
            palette?: number;
        };
        accessories: {
            dlc: String;
            drawable: number;
            texture: number;
            palette?: number;
        };
        undershirt: {
            dlc: String;
            drawable: number;
            texture: number;
            palette?: number;
        };
        armor: {
            dlc: String;
            drawable: number;
            texture: number;
            palette?: number;
        };
        decals: {
            dlc: String;
            drawable: number;
            texture: number;
            palette?: number;
        };
        top: {
            dlc: String;
            drawable: number;
            texture: number;
            palette?: number;
        };
    };
    props: {
        hat: {
            dlc: String;
            drawable: number;
            texture: number;
        };
        glasses: {
            dlc: String;
            drawable: number;
            texture: number;
        };
        ear: {
            dlc: String;
            drawable: number;
            texture: number;
        };
        watch: {
            dlc: String;
            drawable: number;
            texture: number;
        };
        bracelet: {
            dlc: String;
            drawable: number;
            texture: number;
        };
    };
}