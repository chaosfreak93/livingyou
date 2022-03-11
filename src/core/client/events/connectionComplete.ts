import * as alt from 'alt-client';
import * as native from 'natives';
import { loadSceneAtCoords } from '../utility/scene';

let cam: number;

alt.on('connectionComplete', async () => {
    loadIpl();
    alt.toggleGameControls(false);
    alt.toggleVoiceControls(false);
    alt.toggleRmlControls(false);

    await loadSceneAtCoords(new alt.Vector3(-2000, -1200, 55));
    
    cam = native.createCamWithParams("DEFAULT_SCRIPTED_CAMERA", -2000, -1200, 55, 0, 0, 0, 90, false, 2);
    native.setCamRot(cam, -15, 0, -70, 2);
    native.setCamActive(cam, true);
    native.renderScriptCams(true, false, 0, false, false, 0);

    native.displayHud(false);
    native.displayRadar(false);
});

function loadIpl() {
    alt.requestIpl("ferris_finale_Anim");
}

let webview: alt.WebView = null;
let url = null;

alt.onServer('startLogin', (discordAuthUrl: string) => {
    url = discordAuthUrl;
    webview = new alt.WebView('http://resource/webview/login/index.html');
    webview.focus();
    webview.on('loginReady', loginReady);
    alt.showCursor(true);
});

function loginReady() {
    webview.emit('setLoginUrl', url);
}

alt.onServer('authFinished', () => {
    native.setCamActive(cam, false);
    native.renderScriptCams(false, false, 0, false, false, 0);

    native.newLoadSceneStop();
    native.clearHdArea();
    native.destroyCam(cam, true);

    webview.unfocus();
    webview.destroy();
    alt.showCursor(false);
});