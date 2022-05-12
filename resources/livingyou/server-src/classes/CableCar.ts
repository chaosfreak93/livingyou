import * as alt from 'alt-server';
import * as xsync from 'altv-xsync-entity-server';
import ICableCarData from '../../shared/interface/ICableCarData';
import { EntityPools } from '../../shared/enums/entityPools';

const cableCarPool = new xsync.EntityPool(EntityPools.CableCar, { maxStreamedIn: 3 });

class CableCar extends xsync.Entity<ICableCarData> {
    constructor(pos: alt.IVector3, rot: alt.IVector3, model: string, direction: "Up" | "Down") {
        super(
            cableCarPool,
            pos,
            { model, rot, direction },
            {},
            0,
            250
        )
    }
}

new CableCar(
    new alt.Vector3(-740.3, 5594.5, 41.2),
    new alt.Vector3(0, 0, 0),
    "p_cablecar_s",
    "Up"
);

new CableCar(
    new alt.Vector3(446.8, 5571.1, 780.7),
    new alt.Vector3(0, 0, 0),
    "p_cablecar_s",
    "Down"
);