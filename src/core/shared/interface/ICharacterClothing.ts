export default interface ICharacterClothing {
    clothes: [
        head: {
            dlc: string;
            drawable: number;
            texture: number;
            palette?: number;
        },
        mask: {
            dlc: string;
            drawable: number;
            texture: number;
            palette?: number;
        },
        hairStyle: {
            dlc: string;
            drawable: number;
            texture: number;
            palette?: number;
        },
        torso: {
            dlc: string;
            drawable: number;
            texture: number;
            palette?: number;
        },
        legs: {
            dlc: string;
            drawable: number;
            texture: number;
            palette?: number;
        },
        bag: {
            dlc: string;
            drawable: number;
            texture: number;
            palette?: number;
        },
        shoes: {
            dlc: string;
            drawable: number;
            texture: number;
            palette?: number;
        },
        accessories: {
            dlc: string;
            drawable: number;
            texture: number;
            palette?: number;
        },
        undershirt: {
            dlc: string;
            drawable: number;
            texture: number;
            palette?: number;
        },
        armor: {
            dlc: string;
            drawable: number;
            texture: number;
            palette?: number;
        },
        decals: {
            dlc: string;
            drawable: number;
            texture: number;
            palette?: number;
        },
        top: {
            dlc: string;
            drawable: number;
            texture: number;
            palette?: number;
        },
    ];
    props: {
        hat: {
            dlc: string;
            drawable: number;
            texture: number;
        };
        glasses: {
            dlc: string;
            drawable: number;
            texture: number;
        };
        ear: {
            dlc: string;
            drawable: number;
            texture: number;
        };
        watch: {
            dlc: string;
            drawable: number;
            texture: number;
        };
        bracelet: {
            dlc: string;
            drawable: number;
            texture: number;
        };
    };
}
