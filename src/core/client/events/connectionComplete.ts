import * as alt from 'alt-client';
import * as native from 'natives';
import IPLManager from '../systems/iplmanager';
import { loadSceneAtCoords } from '../utility/scene';
import { createCamera, destroyCamera } from '../systems/cameraManager';

let cam: number;

alt.on('connectionComplete', async () => {
    native.doScreenFadeOut(100);
    IPLManager.initializeDefaultIPLs();
    IPLManager.initializeEntitySets();
    alt.toggleGameControls(false);
    alt.toggleVoiceControls(false);
    alt.toggleRmlControls(false);

    alt.emitServer(SYSTEM_EVENTS.BEGIN_CONNECTION);
    createCamera(new alt.Vector3(-2000, -1200, 55), new alt.Vector3(-15, 0, -70), 90);

    native.displayHud(false);
    native.displayRadar(false);
    native.doScreenFadeIn(100);
    webview.isVisible = true;
    webview.focus();
});

let webview: alt.WebView = null;
let url = null;

alt.onServer('startLogin', (discordAuthUrl: string) => {
    url = discordAuthUrl;
    webview = new alt.WebView('http://resource/webview/login/index.html');
    webview.isVisible = false;
    webview.on('loginReady', loginReady);
    alt.showCursor(true);
});

function loginReady() {
    webview.emit('setLoginUrl', url);
}

alt.onServer('authFinished', () => {
    destroyCamera();
    native.newLoadSceneStop();
    native.clearHdArea();

    webview.unfocus();
    webview.destroy();
    alt.showCursor(false);
});