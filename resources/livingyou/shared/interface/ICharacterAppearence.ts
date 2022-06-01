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
            scale: number;
        },
        nose_peak_height: {
            scale: number;
        },
        nose_peak_length: {
            scale: number;
        },
        nose_bone_height: {
            scale: number;
        },
        nose_peak_lowering: {
            scale: number;
        },
        nose_bone_twist: {
            scale: number;
        },
        eye_brown_height: {
            scale: number;
        },
        eye_brown_forward: {
            scale: number;
        },
        cheeks_bone_height: {
            scale: number;
        },
        cheeks_bone_width: {
            scale: number;
        },
        cheeks_width: {
            scale: number;
        },
        eyes_opening: {
            scale: number;
        },
        lips_thickness: {
            scale: number;
        },
        jaw_bone_width: {
            scale: number;
        },
        jaw_bone_back_length: {
            scale: number;
        },
        chimp_bone_lowering: {
            scale: number;
        },
        chimp_bone_length: {
            scale: number;
        },
        chimp_bone_width: {
            scale: number;
        },
        chimp_hole: {
            scale: number;
        },
        neck_thickness: {
            scale: number;
        }
    ];
    headOverlay: [
        blemishes: {
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        facial_hair: {
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        eyebrows: {
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        ageing: {
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        makeup: {
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        blush: {
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        complexion: {
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        sun_damage: {
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        lipstick: {
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        moles_freckles: {
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        chest_hair: {
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        body_blemishes: {
            index: number;
            opacity: number;
            colorType: number;
            colorIndex: number;
        },
        add_body_blemishes: {
            index: number;
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
