import * as alt from 'alt-server';

export default interface ICableCarData {
    id: number;
    heading: number;
    progress: number;
    animation: string;
    direction: 'Up' | 'Down';
    doorStatus: 'Open' | 'Close';
}
