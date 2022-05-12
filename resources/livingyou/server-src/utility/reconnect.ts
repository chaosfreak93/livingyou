import fetch from 'node-fetch';

const DEBUG_PORT = 9223;

async function getClientStatus(): Promise<string> {
    try {
        const response = await fetch(`http://127.0.0.1:${DEBUG_PORT}/status`);
        return Promise.resolve(response.text());
    } catch (error) {
        return Promise.resolve('ERROR');
    }
}

export async function autoReconnect(): Promise<void> {
    const status = await getClientStatus();
    if (status !== 'MAIN_MENU' && status !== 'IN_GAME') {
        setTimeout(autoReconnect, 2500);
        return;
    }

    try {
        await fetch(`http://127.0.0.1:${DEBUG_PORT}/reconnect`, {
            method: 'POST',
        });
    } catch (error) {
        console.log(error);
    }
}
