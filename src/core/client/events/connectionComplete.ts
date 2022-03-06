import * as alt from 'alt-client';
import * as native from 'natives';

let cam = native.createCamWithParams("DEFAULT_SCRIPTED_CAMERA", 0, 0, 0, 0, 0, 0, 90, false, 2);

alt.on('connectionComplete', () => {
    loadIpl();
    alt.toggleGameControls(false);
    
    native.setCamActive(cam, true);
    native.renderScriptCams(true, false, 0, false, false, 0);

    native.newLoadSceneStartSphere(-1645.55, -1113.04, 12.65, 250, 0);
    native.setHdArea(-1645.55, -1113.04, 12.65, 250);
    //native.setFocusPosAndVel(-1645.55, -1113.04, 12.65, 0, 0, 0);
    native.setCamCoord(cam, -2000, -1200, 55);
    native.setCamRot(cam, -15, 0, -70, 2);

    native.displayHud(false);
    native.displayRadar(false);
});

function loadIpl() {
    alt.requestIpl("ferris_finale_Anim");
}

let webview = new alt.WebView('http://resource/webview/login/index.html');
let url = null;

alt.onServer('startLogin', (discordAuthUrl: string) => {
    url = discordAuthUrl;
    webview.focus();
    webview.on('loginReady', loginReady);
    alt.showCursor(true);
});

function loginReady() {
    webview.emit('setLoginUrl', url);
}

alt.onServer('exitLogin', () => {
    alt.toggleGameControls(true);
    native.setCamActive(cam, false);
    native.renderScriptCams(false, false, 0, false, false, 0);

    native.newLoadSceneStop();
    native.clearHdArea();
    native.destroyCam(cam, true);

    native.displayHud(true);
    native.displayRadar(true);
    webview.unfocus();
    webview.destroy();
    alt.showCursor(false);
});