import * as alt from 'alt-server';
import sjcl from 'sjcl';
import express from 'express';
import axios from 'axios';
import { URLSearchParams } from 'url';
import { SYSTEM_EVENTS } from '../../shared/enums/system';

const expressIP = encodeURI(`http://${process.env.REDIRECT_IP}:7790/altv-auth`);
const url = `https://discord.com/api/oauth2/authorize?client_id=948363980743790683&redirect_uri=${expressIP}&response_type=code&scope=identify`;

const app = express();

app.use('/altv-auth', handleAuthenticate);

async function handleAuthenticate(req, res) {
    const token = req.query.code;
    const userToken = req.query.state;
    let request;
    try {
        if (!token || !userToken) return;

        const authParams = new URLSearchParams();
        authParams.append('client_id', process.env.CLIENT_ID);
        authParams.append('client_secret', process.env.CLIENT_SECRET);
        authParams.append('grant_type', 'authorization_code');
        authParams.append('code', token);
        authParams.append('scope', 'identify');
        authParams.append('redirect_uri', expressIP);

        request = await axios.post('https://discord.com/api/oauth2/token', authParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        });

        if (!request.data || !request.data.access_token) return;

        const discordData = { ...request.data };
        request = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `${discordData.token_type} ${discordData.access_token}`,
            },
        });
        
        if (!request.data || !request.data.id || !request.data.username) return;

        const player = [...alt.Player.all].find(player => player.getMeta('identifier') === userToken);
        if (!player || !player.valid) return;
        alt.emit(SYSTEM_EVENTS.DISCORD_FINISH_AUTH, player, request.data);
        alt.emitClient(player, SYSTEM_EVENTS.DISCORD_FINISH_AUTH);
    } catch (error: any) {
        console.log(error);
    }
}

app.listen(7790, () => {
    alt.log("Express Server Started on Port 7790.");
});

function login(player: alt.Player) {
    if (!player || !player.valid) {
        return;
    }

    if (player.name.toLowerCase() == "player") {
        player.kick("Bitte ändere deinen Nutzernamen!");
    }

    player.dimension = player.id + 1;
    player.visible = false;
    player.setPosition(player, -1645.55, -1113.04, 13);

    let hashBytes = sjcl.hash.sha256.hash(JSON.stringify(player.ip + player.hwidHash + player.hwidExHash) + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
    const uniquePlayerData = sjcl.codec.hex.fromBits(hashBytes);
    player.setMeta('identifier', uniquePlayerData);

    alt.emitClient(player, SYSTEM_EVENTS.WEBVIEW_INFO, "http://localhost:3000");
    alt.emitClient(player, SYSTEM_EVENTS.DISCORD_OPEN, `${url}&state=${uniquePlayerData}`);
}

alt.onClient(SYSTEM_EVENTS.BEGIN_CONNECTION, login);