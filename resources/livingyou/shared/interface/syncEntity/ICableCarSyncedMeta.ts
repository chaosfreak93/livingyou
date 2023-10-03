import * as alt from 'alt-shared';

export default interface ICableCarSyncedMeta {
    heading: number;
    progress: number;
    animation: string;
    direction: 'Up' | 'Down';
    doorStatus: 'Open' | 'Close';
    attachedPlayer: {
        id: number;
        pos: alt.Vector3;
        rot: alt.Vector3;
    }[];
}
