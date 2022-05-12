import * as alt from 'alt-server';

export default interface ICableCarData {
    model: string,
    rot: alt.IVector3;
    direction: "Up" | "Down";
}