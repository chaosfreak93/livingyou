import * as alt from 'alt-client';
import * as native from 'natives';

export default class ScreenFade {
    static async fadeIn(duration: number): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            if (!native.isScreenFadedOut() || native.isScreenFadingIn()) return resolve();
            native.doScreenFadeIn(duration);
            await alt.Utils.waitFor(() => native.isScreenFadedIn());
            return resolve();
        });
    }

    static async fadeOut(duration: number): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            if (!native.isScreenFadedIn() || native.isScreenFadingOut()) return resolve();
            native.doScreenFadeOut(duration);
            await alt.Utils.waitFor(() => native.isScreenFadedOut());
            return resolve();
        });
    }
}
