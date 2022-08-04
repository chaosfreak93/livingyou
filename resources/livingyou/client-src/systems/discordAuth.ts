import * as alt from 'alt-client';
import { WebViewController } from '../extensions/webViewController';
import { On, OnServer } from './eventSystem/on';
import ScreenFade from '../utility/screenFade';
import CameraManager from './cameraManager';
import { EmitServer } from './eventSystem/emit';
import { WebViewEvents } from '../../shared/enums/WebViewEvents';

let loginInProgress: boolean = false;

export default class DiscordAuth {
    @OnServer('discord:Open')
    static async open(): Promise<void> {
        await CameraManager.createCamera(new alt.Vector3(-2000, -1200, 55), new alt.Vector3(-15, 0, -70), 90, true);
        await ScreenFade.fadeIn(0);
        alt.toggleGameControls(false);
        const view: alt.WebView = await WebViewController.get();
        view.on(WebViewEvents.DISCORD_AUTH_START_LOGIN, DiscordAuth.obtainToken);

        await WebViewController.openPages(['Login']);
        await WebViewController.focus();
        await WebViewController.showCursor(true);
    }

    @OnServer('discord:ObtainToken')
    static async obtainToken(reset: boolean): Promise<void> {
        if (reset) {
            alt.LocalStorage.delete('token');
            alt.LocalStorage.delete('tokenDate');
            loginInProgress = false;
        }
        if (loginInProgress) return;
        try {
            loginInProgress = true;
            let token: string = alt.LocalStorage.get('token');
            let currentDate: number = alt.LocalStorage.get('tokenDate') as number;
            if ((!token && !currentDate) || currentDate <= new Date().getTime()) {
                token = await alt.Discord.requestOAuth2Token('948363980743790683');
                alt.LocalStorage.set('token', token);
                let newDate = new Date();
                newDate.setDate(newDate.getDate() + 30);
                alt.LocalStorage.set('tokenDate', newDate.getTime()); // 30 Days
                alt.LocalStorage.save();
            }
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

        const view: alt.WebView = await WebViewController.get();
        view.off(WebViewEvents.DISCORD_AUTH_START_LOGIN, DiscordAuth.obtainToken);
        await ScreenFade.fadeOut(0);
        CameraManager.destroyCamera();
        loginInProgress = false;
    }
}
