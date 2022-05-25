import * as alt from 'alt-client';
import * as native from 'natives';
import { WebViewController } from '../extensions/webViewController';
import { On, OnServer } from './eventSystem/on';
import ScreenFade from '../utility/screenFade';
import CameraManager from './cameraManager';
import { EmitServer } from './eventSystem/emit';

let loginInProgress = false;

export default class DiscordAuth {
    @OnServer('discord:Open')
    static async open(): Promise<void> {
        await CameraManager.createCamera(new alt.Vector3(-2000, -1200, 55), new alt.Vector3(-15, 0, -70), 90, true);
        await ScreenFade.fadeIn(0);
        alt.toggleGameControls(false);
        const view = await WebViewController.get();
        view.on('startLogin', DiscordAuth.obtainToken);

        WebViewController.openPages(['Login']);
        WebViewController.focus();
        WebViewController.showCursor(true);
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

    @OnServer('discord:Close')
    static async close(): Promise<void> {
        WebViewController.showCursor(false);
        WebViewController.unfocus();
        WebViewController.closePages(['Login']);

        const view = await WebViewController.get();
        view.off('startLogin', DiscordAuth.obtainToken);
        await ScreenFade.fadeOut(0);
        CameraManager.destroyCamera();
        loginInProgress = false;
    }
}
