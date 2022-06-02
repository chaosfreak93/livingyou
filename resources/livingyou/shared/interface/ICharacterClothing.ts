export default interface ICharacterClothing {
    clothes: [
        head: {
            name?: string;
            component: 0;
            drawable: number;
            maxDrawable?: number;
            texture: number;
        },
        mask: {
            name?: string;
            component: 1;
            drawable: number;
            maxDrawable?: number;
            texture: number;
        },
        hairStyle: {
            name?: string;
            component: 2;
            drawable: number;
            maxDrawable?: number;
            texture: number;
        },
        torso: {
            name?: string;
            component: 3;
            drawable: number;
            maxDrawable?: number;
            texture: number;
        },
        legs: {
            name?: string;
            component: 4;
            drawable: number;
            maxDrawable?: number;
            texture: number;
        },
        bag: {
            name?: string;
            component: 5;
            drawable: number;
            maxDrawable?: number;
            texture: number;
        },
        shoes: {
            name?: string;
            component: 6;
            drawable: number;
            maxDrawable?: number;
            texture: number;
        },
        accessories: {
            name?: string;
            component: 7;
            drawable: number;
            maxDrawable?: number;
            texture: number;
        },
        undershirt: {
            name?: string;
            component: 8;
            drawable: number;
            maxDrawable?: number;
            texture: number;
        },
        armor: {
            name?: string;
            component: 9;
            drawable: number;
            maxDrawable?: number;
            texture: number;
        },
        decals: {
            name?: string;
            component: 10;
            drawable: number;
            maxDrawable?: number;
            texture: number;
        },
        top: {
            name?: string;
            component: 11;
            drawable: number;
            maxDrawable?: number;
            texture: number;
        }
    ];
    props: [
        hat: {
            name?: string;
            component: 0;
            drawable: number;
            maxDrawable?: number;
            texture: number;
        },
        glasses: {
            name?: string;
            component: 1;
            drawable: number;
            maxDrawable?: number;
            texture: number;
        },
        ear: {
            name?: string;
            component: 2;
            drawable: number;
            maxDrawable?: number;
            texture: number;
        },
        watch: {
            name?: string;
            component: 6;
            drawable: number;
            maxDrawable?: number;
            texture: number;
        },
        bracelet: {
            name?: string;
            component: 7;
            drawable: number;
            maxDrawable?: number;
            texture: number;
        }
    ];
}
