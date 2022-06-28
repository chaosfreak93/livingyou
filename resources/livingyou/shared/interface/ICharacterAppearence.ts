export default interface ICharacterAppearence {
    male: boolean;
    headBlendData: {
        mother: number;
        father: number;
        similarityAnatomy: number;
        similaritySkinColor: number;
    };
    faceFeature: [
        nose_width: {
            name?: string;
            scale: number;
        },
        nose_peak_height: {
            name?: string;
            scale: number;
        },
        nose_peak_length: {
            name?: string;
            scale: number;
        },
        nose_bone_height: {
            name?: string;
            scale: number;
        },
        nose_peak_lowering: {
            name?: string;
            scale: number;
        },
        nose_bone_twist: {
            name?: string;
            scale: number;
        },
        eye_brown_height: {
            name?: string;
            scale: number;
        },
        eye_brown_forward: {
            name?: string;
            scale: number;
        },
        cheeks_bone_height: {
            name?: string;
            scale: number;
        },
        cheeks_bone_width: {
            name?: string;
            scale: number;
        },
        cheeks_width: {
            name?: string;
            scale: number;
        },
        eyes_opening: {
            name?: string;
            scale: number;
        },
        lips_thickness: {
            name?: string;
            scale: number;
        },
        jaw_bone_width: {
            name?: string;
            scale: number;
        },
        jaw_bone_back_length: {
            name?: string;
            scale: number;
        },
        chimp_bone_lowering: {
            name?: string;
            scale: number;
        },
        chimp_bone_length: {
            name?: string;
            scale: number;
        },
        chimp_bone_width: {
            name?: string;
            scale: number;
        },
        chimp_hole: {
            name?: string;
            scale: number;
        },
        neck_thickness: {
            name?: string;
            scale: number;
        }
    ];
    headOverlay: [
        blemishes: {
            name?: string;
            index: number;
            maxIndex?: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        facial_hair: {
            name?: string;
            index: number;
            maxIndex?: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        eyebrows: {
            name?: string;
            index: number;
            maxIndex?: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        ageing: {
            name?: string;
            index: number;
            maxIndex?: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        makeup: {
            name?: string;
            index: number;
            maxIndex?: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        blush: {
            name?: string;
            index: number;
            maxIndex?: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        complexion: {
            name?: string;
            index: number;
            maxIndex?: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        sun_damage: {
            name?: string;
            index: number;
            maxIndex?: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        lipstick: {
            name?: string;
            index: number;
            maxIndex?: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        moles_freckles: {
            name?: string;
            index: number;
            maxIndex?: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        chest_hair: {
            name?: string;
            index: number;
            maxIndex?: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        body_blemishes: {
            name?: string;
            index: number;
            maxIndex?: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        add_body_blemishes: {
            name?: string;
            index: number;
            maxIndex?: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        }
    ];
    eyeColor: number;
    hairColor: {
        colorId: number;
        highlightColorId: number;
    };
}
