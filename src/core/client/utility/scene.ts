import * as alt from 'alt-client';
import * as native from 'natives';

export function loadSceneAtCoords(pos: alt.Vector3): Promise<boolean> {
    let timerHandle: number;
    return new Promise<boolean>((resolve) => {
        native.newLoadSceneStartSphere(
            pos.x,
            pos.y,
            pos.z ?? native.getHeightmapBottomZForPosition(pos.x, pos.z),
            2,
            1
        );

        timerHandle = alt.setInterval(() => {
            if (!native.isNewLoadSceneActive()) {
                return resolve(false);
            }

            if (!native.isNewLoadSceneLoaded()) {
                return;
            }

            return resolve(true);
        }, 10);
    }).finally(() => {
        native.newLoadSceneStop();
        alt.clearInterval(timerHandle);
    });
}
