import * as alt from 'alt-server';

export default interface ICableCarSyncedMeta {
    heading: number;
    progress: number;
    animation: string;
    direction: 'Up' | 'Down';
    doorStatus: 'Open' | 'Close';
    attachedPlayer: {
        id: number;
        pos: alt.IVector3;
        rot: alt.IVector3;
    }[];
}
