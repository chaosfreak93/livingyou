import * as alt from 'alt-client';
import * as native from 'natives';
import * as xsync from 'altv-xsync-entity-client';
import { EntityPools } from '../../shared/enums/entityPools';
import ITextLabelSyncedMeta from '../../shared/interface/syncEntity/ITextLabelSyncedMeta';

@xsync.onEntityEvents<TextLabel>({
    streamIn: (entity) => entity.streamIn(),
    streamOut: (entity) => entity.streamOut(),
    syncedMetaChange: (entity, syncedMeta) => entity.syncedMetaChange(syncedMeta),
    posChange: (entity, pos) => entity.posChange(pos),
})
class TextLabel extends xsync.Entity<ITextLabelSyncedMeta> {
    private drawTick: number = 0;

    private streamIn(): void {
        this.drawTick = alt.everyTick(() => {
            if (!alt.isPointOnScreen(this.pos.x, this.pos.y, this.pos.z)) return;
            let entity = alt.Player.local.vehicle ? alt.Player.local.vehicle : alt.Player.local;
            let vector = native.getEntityVelocity(entity);
            let frameTime = native.getFrameTime();
            native.setDrawOrigin(
                this.pos.x + vector.x * frameTime,
                this.pos.y + vector.y * frameTime,
                this.pos.z + vector.z * frameTime,
                0
            );
            native.beginTextCommandDisplayText('STRING');
            native.addTextComponentSubstringPlayerName(this.syncedMeta.text);
            native.setTextFont(this.syncedMeta.font);
            let size = this.syncedMeta.scale / 2.3;
            native.setTextScale(1, size);
            native.setTextWrap(0.0, 1.0);
            native.setTextCentre(this.syncedMeta.center);
            native.setTextColour(
                this.syncedMeta.color.r,
                this.syncedMeta.color.g,
                this.syncedMeta.color.b,
                this.syncedMeta.color.a
            );
            if (this.syncedMeta.outline) {
                native.setTextOutline();
            }
            if (this.syncedMeta.dropShadow) {
                native.setTextDropShadow();
            }
            native.endTextCommandDisplayText(0, 0, 0);
            native.clearDrawOrigin();
        });
    }

    private streamOut(): void {
        alt.clearEveryTick(this.drawTick);
    }

    private syncedMetaChange(syncedMeta: Partial<ITextLabelSyncedMeta>): void {}

    public posChange(pos: alt.IVector3): void {}
}

new xsync.EntityPool(EntityPools.TextLabel, TextLabel);
