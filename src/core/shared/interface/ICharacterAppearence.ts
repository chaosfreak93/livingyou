import * as alt from 'alt-server';

export default interface ICharacterAppearence {
    headBlendData: {
        shapeFirstID: number;
        shapeSecondID: number;
        shapeThirdID: number;
        skinFirstID: number;
        skinSecondID: number;
        skinThirdID: number;
        shapeMix: number;
        skinMix: number;
        thirdMix: number;
    };
    headBlendPaletteColor: {
        id: number;
        rgb: alt.RGBA;
    };
    faceFeature: {
        index: number;
        scale: number;
    };
    headOverlay: {
        overlayID: number;
        index: number;
        opacity: number;
    };
    headOverlayColor: {
        overlayID: number;
        colorType: number;
        colorIndex: number;
        secondColorIndex: number;
    };
    eyeColor: number;
    hairColor: number;
}
