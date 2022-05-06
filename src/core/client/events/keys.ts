import * as alt from 'alt-client';
import { SYSTEM_EVENTS } from '../../shared/enums/system';

alt.on('keyup', (key: number) => alt.emitServer(SYSTEM_EVENTS.KEY_MANAGER_KEY_UP, key));
alt.on('keydown', (key: number) => alt.emitServer(SYSTEM_EVENTS.KEY_MANAGER_KEY_DOWN, key));