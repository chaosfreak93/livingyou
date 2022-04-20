export default interface ICharacterClothing {
    clothes: [
        head: {
            drawable: number;
            texture: number;
            palette?: number;
        },
        mask: {
            drawable: number;
            texture: number;
            palette?: number;
        },
        hairStyle: {
            drawable: number;
            texture: number;
            palette?: number;
        },
        torso: {
            drawable: number;
            texture: number;
            palette?: number;
        },
        legs: {
            drawable: number;
            texture: number;
            palette?: number;
        },
        bag: {
            drawable: number;
            texture: number;
            palette?: number;
        },
        shoes: {
            drawable: number;
            texture: number;
            palette?: number;
        },
        accessories: {
            drawable: number;
            texture: number;
            palette?: number;
        },
        undershirt: {
            drawable: number;
            texture: number;
            palette?: number;
        },
        armor: {
            drawable: number;
            texture: number;
            palette?: number;
        },
        decals: {
            drawable: number;
            texture: number;
            palette?: number;
        },
        top: {
            drawable: number;
            texture: number;
            palette?: number;
        },
    ];
    props: {
        hat: {
            drawable: number;
            texture: number;
        };
        glasses: {
            drawable: number;
            texture: number;
        };
        ear: {
            drawable: number;
            texture: number;
        };
        watch: {
            drawable: number;
            texture: number;
        };
        bracelet: {
            drawable: number;
            texture: number;
        };
    };
}
