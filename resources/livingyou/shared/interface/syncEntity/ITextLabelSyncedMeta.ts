import * as alt from 'alt-server';

export default interface ITextLabelSyncedMeta {
    text: string;
    font: number;
    scale: number;
    color: { r: number; g: number; b: number; a: number };
    dropShadow: boolean;
    outline: boolean;
    center: boolean;
}
