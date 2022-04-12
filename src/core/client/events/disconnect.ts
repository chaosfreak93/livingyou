import * as alt from 'alt-client';
import { destroyAllCameras } from '../systems/cameraManager';

alt.on('resourceStop', async () => {
    destroyAllCameras();
});