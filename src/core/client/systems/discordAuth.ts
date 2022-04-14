import * as alt from 'alt-client';
import * as native from 'natives';
import { SYSTEM_EVENTS } from '../../shared/enums/system';
import { WebViewController } from '../extensions/webViewController';
import CameraManager from './cameraManager';

let url: string;

export default class DiscordAuth {
    static async open(discordAuthUrl: string): Promise<void> {
        await CameraManager.createCamera(new alt.Vector3(-2000, -1200, 55), new alt.Vector3(-15, 0, -70), 90, true);
        native.doScreenFadeIn(0);
        url = discordAuthUrl;
        alt.toggleGameControls(false);
        const view = await WebViewController.get();
        view.on('loginReady', DiscordAuth.loginReady);

        WebViewController.openPages(['Login']);
        WebViewController.focus();
        WebViewController.showCursor(true);
    }

    static async loginReady(): Promise<void> {
        const view = await WebViewController.get();
        view.emit('setLoginUrl', url);
    }

    static async authFinished(): Promise<void> {
        const view = await WebViewController.get();
        view.off('loginReady', DiscordAuth.loginReady);

        WebViewController.showCursor(false);
        WebViewController.unfocus();
        WebViewController.closePages(['Login']);
        native.doScreenFadeOut(0);
        CameraManager.destroyCamera();
    }
}

alt.onServer(SYSTEM_EVENTS.DISCORD_OPEN, DiscordAuth.open);
alt.onServer(SYSTEM_EVENTS.DISCORD_FINISH_AUTH, DiscordAuth.authFinished);
