let url = null;

function openLoginPage() {
    if (this.url == null) return;

    window.open(this.url);
}

function setLoginUrl(url) {
    this.url = url;
}

if ('alt' in window) {
    alt.on('setLoginUrl', this.setLoginUrl);
    alt.emit('loginReady');
}