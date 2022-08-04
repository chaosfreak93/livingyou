import * as alt from 'alt-client';
import { WebViewController } from '../extensions/webViewController';
import { On, OnServer } from './eventSystem/on';
import ScreenFade from '../utility/screenFade';
import CameraManager from './cameraManager';
import { EmitServer } from './eventSystem/emit';
import { WebViewEvents } from '../../shared/enums/WebViewEvents';

let loginInProgress = false;

export default class DiscordAuth {
    @OnServer('discord:Open')
    static async open(): Promise<void> {
        await CameraManager.createCamera(new alt.Vector3(-2000, -1200, 55), new alt.Vector3(-15, 0, -70), 90, true);
        await ScreenFade.fadeIn(0);
        alt.toggleGameControls(false);
        const view = await WebViewController.get();
        view.on(WebViewEvents.DISCORD_AUTH_START_LOGIN, DiscordAuth.obtainToken);

        await WebViewController.openPages(['Login']);
        await WebViewController.focus();
        await WebViewController.showCursor(true);
    }

    static async obtainToken(): Promise<void> {
        if (loginInProgress) return;
        try {
            loginInProgress = true;
            const token = await alt.Discord.requestOAuth2Token('948363980743790683');
            EmitServer('discord:ProceedToken', token);
        } catch (err) {
            alt.logError(err);
            loginInProgress = false;
        }
    }

    @On('disconnect')
    @OnServer('discord:Close')
    static async close(): Promise<void> {
        await WebViewController.showCursor(false);
        await WebViewController.unfocus();
        await WebViewController.closePages(['Login']);

        const view = await WebViewController.get();
        view.off(WebViewEvents.DISCORD_AUTH_START_LOGIN, DiscordAuth.obtainToken);
        await ScreenFade.fadeOut(0);
        CameraManager.destroyCamera();
        loginInProgress = false;
    }
}
