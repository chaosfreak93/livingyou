import * as alt from 'alt-server';

declare module 'alt-server' {
    export interface Player {
        hasModel?: boolean;

        setPosition(player: alt.Player, x: number, y: number, z: number): void;
    }
}

alt.Player.prototype.setPosition = function setPosition(player: alt.Player, x: number, y: number, z: number) {
    if (!player.hasModel) {
        player.hasModel = true;
        player.spawn(x, y, z, 0);
        player.model = 'mp_m_freemode_01';
    }

    player.pos = new alt.Vector3(x, y, z);
}