import * as alt from 'alt-client';
import * as native from 'natives';
import { OnServer } from '../systems/eventSystem/on';
import { World } from '../systems/world';

export default class DevTools {
    @OnServer('debug')
    static debug(): void {
        alt.log('POSITION:');
        const pos = { ...alt.Player.local.pos };
        alt.log(JSON.stringify(pos));
    
        alt.log('ROTATION:');
        const rot = { ...alt.Player.local.rot };
        alt.log(JSON.stringify(rot));
    
        alt.log('HEADING:');
        const heading = native.getEntityHeading(alt.Player.local.scriptID);
        alt.log(heading);
    
        alt.log('NATIVE ROTATION:');
        const nativeRotation = { ...native.getEntityRotation(alt.Player.local.scriptID, 1) };
        alt.log(JSON.stringify(nativeRotation));
    
        if (alt.Player.local.isAiming) {
            alt.log('AIM POSITION:');
            const aimPos = { ...alt.Player.local.aimPos };
            alt.log(JSON.stringify(aimPos));
        }
    
        alt.log(`Time: ${World.hour}:${World.minute}:00`);
    }
    
}