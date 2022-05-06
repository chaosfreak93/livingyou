import * as alt from 'alt-server';
import axios from 'axios';
import { SYSTEM_EVENTS } from '../../shared/enums/system';

function login(player: alt.Player) {
    if (!player || !player.valid) {
        return;
    }

    if (player.name.toLowerCase() == 'player') {
        player.kick('Bitte ändere deinen Nutzernamen!');
    }

    player.dimension = player.id + 1;
    player.visible = false;
    player.setPosition(player, -1645.55, -1113.04, 13);

    alt.emitClient(player, SYSTEM_EVENTS.WEBVIEW_INFO, 'http://localhost:3000');
    alt.emitClient(player, SYSTEM_EVENTS.DISCORD_OPEN);
}

alt.on(SYSTEM_EVENTS.BEGIN_CONNECTION, login);
alt.onClient(SYSTEM_EVENTS.BEGIN_CONNECTION, login);

async function startLogin(player: alt.Player, token: string): Promise<void> {
    const request = await axios
        .get('https://discordapp.com/api/users/@me', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${token}`,
            },
        })
        .catch((err) => {
            return null;
        });

    if (!request || !request.data || !request.data.id || !request.data.username) {
        player.kick('Authorization failed');
        return;
    }

    alt.emit(SYSTEM_EVENTS.DISCORD_FINISH_AUTH, player, request.data);
    alt.emitClient(player, SYSTEM_EVENTS.DISCORD_FINISH_AUTH);
}

alt.on(SYSTEM_EVENTS.DISCORD_LOGIN, startLogin);
alt.onClient(SYSTEM_EVENTS.DISCORD_LOGIN, startLogin);
