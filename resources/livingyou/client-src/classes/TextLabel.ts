import * as alt from 'alt-client';
import { On } from '../systems/eventSystem/on';

class TextLabel {
    static textLabelPool: { id: string, entity: alt.TextLabel }[] = [];
 
    @On('worldObjectStreamIn')
    private streamIn(object: alt.WorldObject): void {
        if (!(object instanceof alt.VirtualEntity)) return;
        if (object.getStreamSyncedMeta('type') !== 'textLabel') return;

        let textLabel = new alt.TextLabel(
            object.getStreamSyncedMeta('text') as string,
            object.getStreamSyncedMeta('font') as string,
            object.getStreamSyncedMeta('fontSize') as number,
            object.getStreamSyncedMeta('scale') as number,
            object.pos,
            new alt.Vector3(0, 0, 0),
            object.getStreamSyncedMeta('color') as alt.RGBA,
            object.getStreamSyncedMeta('outlineWidth') as number,
            object.getStreamSyncedMeta('outlineColor') as alt.RGBA,
        );
        textLabel.faceCamera = true;
        textLabel.visible = true;

        TextLabel.textLabelPool.push({
            id: object.getStreamSyncedMeta('textLabelId') as string,
            entity: textLabel
        });
    }

    @On('worldObjectStreamOut')
    private streamOut(object: alt.WorldObject): void {
        if (!(object instanceof alt.VirtualEntity)) return;
        if (object.getStreamSyncedMeta('type') !== 'textLabel') return;

        let textLabel = TextLabel.textLabelPool.find((value) => value.id === object.getStreamSyncedMeta('textLabelId') as string);
        textLabel.entity.destroy();
        const textLabelEntityIndex = TextLabel.textLabelPool.indexOf(textLabel);
        TextLabel.textLabelPool.splice(textLabelEntityIndex, 1);
    }
}
