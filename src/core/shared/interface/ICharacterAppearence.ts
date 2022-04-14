import * as alt from 'alt-server';

export default interface ICharacterAppearence {
    male: boolean;
    headBlendData: {
        shapeFirstID: number;
        shapeSecondID: number;
        skinFirstID: number;
        skinSecondID: number;
        shapeMix: number;
        skinMix: number;
    };
    headBlendPaletteColor: [
        {
            id: 0;
            r: number;
            g: number;
            b: number;
        },
        {
            id: 1;
            r: number;
            g: number;
            b: number;
        },
        {
            id: 2;
            r: number;
            g: number;
            b: number;
        },
        {
            id: 3;
            r: number;
            g: number;
            b: number;
        }
    ];
    faceFeature: [
        {
            index: 0;
            scale: number;
        },
        {
            index: 1;
            scale: number;
        },
        {
            index: 2;
            scale: number;
        },
        {
            index: 3;
            scale: number;
        },
        {
            index: 4;
            scale: number;
        },
        {
            index: 5;
            scale: number;
        },
        {
            index: 6;
            scale: number;
        },
        {
            index: 7;
            scale: number;
        },
        {
            index: 8;
            scale: number;
        },
        {
            index: 9;
            scale: number;
        },
        {
            index: 10;
            scale: number;
        },
        {
            index: 11;
            scale: number;
        },
        {
            index: 12;
            scale: number;
        },
        {
            index: 13;
            scale: number;
        },
        {
            index: 14;
            scale: number;
        },
        {
            index: 15;
            scale: number;
        },
        {
            index: 16;
            scale: number;
        },
        {
            index: 17;
            scale: number;
        },
        {
            index: 18;
            scale: number;
        },
        {
            index: 19;
            scale: number;
        }
    ];
    headOverlay: [
        {
            overlayID: 0;
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
            secondColorIndex: number;
        },
        {
            overlayID: 1;
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
            secondColorIndex: number;
        },
        {
            overlayID: 2;
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
            secondColorIndex: number;
        },
        {
            overlayID: 3;
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
            secondColorIndex: number;
        },
        {
            overlayID: 4;
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
            secondColorIndex: number;
        },
        {
            overlayID: 5;
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
            secondColorIndex: number;
        },
        {
            overlayID: 6;
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
            secondColorIndex: number;
        },
        {
            overlayID: 7;
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
            secondColorIndex: number;
        },
        {
            overlayID: 8;
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
            secondColorIndex: number;
        },
        {
            overlayID: 9;
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
            secondColorIndex: number;
        },
        {
            overlayID: 10;
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
            secondColorIndex: number;
        },
        {
            overlayID: 11;
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
            secondColorIndex: number;
        },
        {
            overlayID: 12;
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
            secondColorIndex: number;
        }
    ];
    eyeColor: number;
    hairColor: {
        colorId: number;
        highlightColorId: number;
    };
}
