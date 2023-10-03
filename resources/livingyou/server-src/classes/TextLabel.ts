import * as alt from 'alt-server';

const textLabelEntityGroup = new alt.VirtualEntityGroup(15);

export default class TextLabel extends alt.VirtualEntity {
    constructor(
        textLabelId: string,
        pos: alt.Vector3,
        text: string,
        fontName: string,
        fontSize: number,
        scale: number,
        color: alt.RGBA,
        outlineWidth: number,
        outlineColor: alt.RGBA,
    ) {
        super(
            textLabelEntityGroup,
            pos,
            5,
            { type: 'textLabel', textLabelId, text, fontName, fontSize, scale, color, outlineWidth, outlineColor },
        );
    }
}
