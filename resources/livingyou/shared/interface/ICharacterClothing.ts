export default interface ICharacterClothing {
    clothes: [
        head: {
            component: 0;
            drawable: number;
            texture: number;
        },
        mask: {
            component: 1;
            drawable: number;
            texture: number;
        },
        hairStyle: {
            component: 2;
            drawable: number;
            texture: number;
        },
        torso: {
            component: 3;
            drawable: number;
            texture: number;
        },
        legs: {
            component: 4;
            drawable: number;
            texture: number;
        },
        bag: {
            component: 5;
            drawable: number;
            texture: number;
        },
        shoes: {
            component: 6;
            drawable: number;
            texture: number;
        },
        accessories: {
            component: 7;
            drawable: number;
            texture: number;
        },
        undershirt: {
            component: 8;
            drawable: number;
            texture: number;
        },
        armor: {
            component: 9;
            drawable: number;
            texture: number;
        },
        decals: {
            component: 10;
            drawable: number;
            texture: number;
        },
        top: {
            component: 11;
            drawable: number;
            texture: number;
        }
    ];
    props: [
        hat: {
            component: 0;
            drawable: number;
            texture: number;
        },
        glasses: {
            component: 1;
            drawable: number;
            texture: number;
        },
        ear: {
            component: 2;
            drawable: number;
            texture: number;
        },
        watch: {
            component: 6;
            drawable: number;
            texture: number;
        },
        bracelet: {
            component: 7;
            drawable: number;
            texture: number;
        }
    ];
}
