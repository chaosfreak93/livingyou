import * as alt from 'alt-client';
import * as native from 'natives';
import { WebViewController } from '../extensions/webViewController';

export default class Inventory {
    static async open(): Promise<void> {
        const view = await WebViewController.get();
    }
}
