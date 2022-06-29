import * as alt from 'alt-server';
import * as xsync from 'altv-xsync-entity-server';
import { EntityPools } from '../../shared/enums/entityPools';
import ITextLabelSyncedMeta from '../../shared/interface/syncEntity/ITextLabelSyncedMeta';
import ITextLabelMeta from '../../shared/interface/syncEntity/ITextLabelMeta';

const textLabelEntityPool = new xsync.EntityPool(EntityPools.TextLabel, { maxStreamedIn: 15 });

export default class TextLabel extends xsync.Entity<ITextLabelSyncedMeta, ITextLabelMeta> {
    constructor(
        textLabelId: string,
        pos: alt.IVector3,
        text: string,
        font: number,
        scale: number,
        color: { r: number; g: number; b: number; a: number },
        dropShadow: boolean,
        outline: boolean,
        center: boolean
    ) {
        super(
            textLabelEntityPool,
            pos,
            { text, font, scale, color, dropShadow, outline, center },
            { textLabelId },
            0,
            5
        );
    }
}
