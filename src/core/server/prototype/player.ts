import * as alt from 'alt-server';
import ICharacter from '../../shared/interface/ICharacter';

declare module 'alt-server' {
    export interface Player {
        hasModel?: boolean;
        character?: ICharacter;

        setPosition(player: alt.Player, x: number, y: number, z: number): void;

        // Clothing
        setHead(
            player: alt.Player,
            applyClothing: boolean,
            dlc: string,
            drawable: number,
            texture: number,
            palette?: number
        ): void;
        setMask(
            player: alt.Player,
            applyClothing: boolean,
            dlc: string,
            drawable: number,
            texture: number,
            palette?: number
        ): void;
        setHairStyle(
            player: alt.Player,
            applyClothing: boolean,
            dlc: string,
            drawable: number,
            texture: number,
            palette?: number
        ): void;
        setTorso(
            player: alt.Player,
            applyClothing: boolean,
            dlc: string,
            drawable: number,
            texture: number,
            palette?: number
        ): void;
        setLegs(
            player: alt.Player,
            applyClothing: boolean,
            dlc: string,
            drawable: number,
            texture: number,
            palette?: number
        ): void;
        setBag(
            player: alt.Player,
            applyClothing: boolean,
            dlc: string,
            drawable: number,
            texture: number,
            palette?: number
        ): void;
        setShoes(
            player: alt.Player,
            applyClothing: boolean,
            dlc: string,
            drawable: number,
            texture: number,
            palette?: number
        ): void;
        setAccessories(
            player: alt.Player,
            applyClothing: boolean,
            dlc: string,
            drawable: number,
            texture: number,
            palette?: number
        ): void;
        setUndershirt(
            player: alt.Player,
            applyClothing: boolean,
            dlc: string,
            drawable: number,
            texture: number,
            palette?: number
        ): void;
        setClothArmor(
            player: alt.Player,
            applyClothing: boolean,
            dlc: string,
            drawable: number,
            texture: number,
            palette?: number
        ): void;
        setDecals(
            player: alt.Player,
            applyClothing: boolean,
            dlc: string,
            drawable: number,
            texture: number,
            palette?: number
        ): void;
        setTop(
            player: alt.Player,
            applyClothing: boolean,
            dlc: string,
            drawable: number,
            texture: number,
            palette?: number
        ): void;

        // Props
        setHat(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number): void;
        setGlasses(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number): void;
        setEar(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number): void;
        setWatch(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number): void;
        setBracelet(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number): void;

        applyClothing(player: alt.Player): void;
    }
}

alt.Player.prototype.setPosition = function setPosition(player: alt.Player, x: number, y: number, z: number): void {
    if (!player.hasModel) {
        player.hasModel = true;
        player.spawn(x, y, z, 0);
        player.model = 'mp_m_freemode_01';
    }

    player.pos = new alt.Vector3(x, y, z);
};

// Clothing
alt.Player.prototype.setHead = function setHead(
    player: alt.Player,
    applyClothing: boolean,
    dlc: string,
    drawable: number,
    texture: number,
    palette?: number
): void {
    player.character.characterClothing.clothes[0].dlc = dlc;
    player.character.characterClothing.clothes[0].drawable = drawable;
    player.character.characterClothing.clothes[0].texture = texture;
    player.character.characterClothing.clothes[0].palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setMask = function setMask(
    player: alt.Player,
    applyClothing: boolean,
    dlc: string,
    drawable: number,
    texture: number,
    palette?: number
): void {
    player.character.characterClothing.clothes[1].dlc = dlc;
    player.character.characterClothing.clothes[1].drawable = drawable;
    player.character.characterClothing.clothes[1].texture = texture;
    player.character.characterClothing.clothes[1].palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setHairStyle = function setHairStyle(
    player: alt.Player,
    applyClothing: boolean,
    dlc: string,
    drawable: number,
    texture: number,
    palette?: number
): void {
    player.character.characterClothing.clothes[2].dlc = dlc;
    player.character.characterClothing.clothes[2].drawable = drawable;
    player.character.characterClothing.clothes[2].texture = texture;
    player.character.characterClothing.clothes[2].palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setTorso = function setTorso(
    player: alt.Player,
    applyClothing: boolean,
    dlc: string,
    drawable: number,
    texture: number,
    palette?: number
): void {
    player.character.characterClothing.clothes[3].dlc = dlc;
    player.character.characterClothing.clothes[3].drawable = drawable;
    player.character.characterClothing.clothes[3].texture = texture;
    player.character.characterClothing.clothes[3].palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setLegs = function setLegs(
    player: alt.Player,
    applyClothing: boolean,
    dlc: string,
    drawable: number,
    texture: number,
    palette?: number
): void {
    player.character.characterClothing.clothes[4].dlc = dlc;
    player.character.characterClothing.clothes[4].drawable = drawable;
    player.character.characterClothing.clothes[4].texture = texture;
    player.character.characterClothing.clothes[4].palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setBag = function setBag(
    player: alt.Player,
    applyClothing: boolean,
    dlc: string,
    drawable: number,
    texture: number,
    palette?: number
): void {
    player.character.characterClothing.clothes[5].dlc = dlc;
    player.character.characterClothing.clothes[5].drawable = drawable;
    player.character.characterClothing.clothes[5].texture = texture;
    player.character.characterClothing.clothes[5].palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setShoes = function setShoes(
    player: alt.Player,
    applyClothing: boolean,
    dlc: string,
    drawable: number,
    texture: number,
    palette?: number
): void {
    player.character.characterClothing.clothes[6].dlc = dlc;
    player.character.characterClothing.clothes[6].drawable = drawable;
    player.character.characterClothing.clothes[6].texture = texture;
    player.character.characterClothing.clothes[6].palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setAccessories = function setAccessories(
    player: alt.Player,
    applyClothing: boolean,
    dlc: string,
    drawable: number,
    texture: number,
    palette?: number
): void {
    player.character.characterClothing.clothes[7].dlc = dlc;
    player.character.characterClothing.clothes[7].drawable = drawable;
    player.character.characterClothing.clothes[7].texture = texture;
    player.character.characterClothing.clothes[7].palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setUndershirt = function setUndershirt(
    player: alt.Player,
    applyClothing: boolean,
    dlc: string,
    drawable: number,
    texture: number,
    palette?: number
): void {
    player.character.characterClothing.clothes[8].dlc = dlc;
    player.character.characterClothing.clothes[8].drawable = drawable;
    player.character.characterClothing.clothes[8].texture = texture;
    player.character.characterClothing.clothes[8].palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setClothArmor = function setClothArmor(
    player: alt.Player,
    applyClothing: boolean,
    dlc: string,
    drawable: number,
    texture: number,
    palette?: number
): void {
    player.character.characterClothing.clothes[9].dlc = dlc;
    player.character.characterClothing.clothes[9].drawable = drawable;
    player.character.characterClothing.clothes[9].texture = texture;
    player.character.characterClothing.clothes[9].palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setDecals = function setDecals(
    player: alt.Player,
    applyClothing: boolean,
    dlc: string,
    drawable: number,
    texture: number,
    palette?: number
): void {
    player.character.characterClothing.clothes[10].dlc = dlc;
    player.character.characterClothing.clothes[10].drawable = drawable;
    player.character.characterClothing.clothes[10].texture = texture;
    player.character.characterClothing.clothes[10].palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setTop = function setTop(
    player: alt.Player,
    applyClothing: boolean,
    dlc: string,
    drawable: number,
    texture: number,
    palette?: number
): void {
    player.character.characterClothing.clothes[11].dlc = dlc;
    player.character.characterClothing.clothes[11].drawable = drawable;
    player.character.characterClothing.clothes[11].texture = texture;
    player.character.characterClothing.clothes[11].palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

// Props
alt.Player.prototype.setHat = function setHat(
    player: alt.Player,
    applyClothing: boolean,
    dlc: string,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.props.hat.dlc = dlc;
    player.character.characterClothing.props.hat.drawable = drawable;
    player.character.characterClothing.props.hat.texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setGlasses = function setGlasses(
    player: alt.Player,
    applyClothing: boolean,
    dlc: string,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.props.glasses.dlc = dlc;
    player.character.characterClothing.props.glasses.drawable = drawable;
    player.character.characterClothing.props.glasses.texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setEar = function setEar(
    player: alt.Player,
    applyClothing: boolean,
    dlc: string,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.props.ear.dlc = dlc;
    player.character.characterClothing.props.ear.drawable = drawable;
    player.character.characterClothing.props.ear.texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setWatch = function setWatch(
    player: alt.Player,
    applyClothing: boolean,
    dlc: string,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.props.watch.dlc = dlc;
    player.character.characterClothing.props.watch.drawable = drawable;
    player.character.characterClothing.props.watch.texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setBracelet = function setBracelet(
    player: alt.Player,
    applyClothing: boolean,
    dlc: string,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.props.bracelet.dlc = dlc;
    player.character.characterClothing.props.bracelet.drawable = drawable;
    player.character.characterClothing.props.bracelet.texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.applyClothing = function applyClothing(player: alt.Player): void {
    let clothes = player.character.characterClothing.clothes;
    let props = player.character.characterClothing.props;

    for (let i = 0; i <= 11; i++) {
        player.setDlcClothes(alt.hash(clothes[i].dlc), i, clothes[i].drawable, clothes[i].texture, clothes[i].palette);
    }

    player.setDlcProp(alt.hash(props.hat.dlc), 0, props.hat.drawable, props.hat.texture);
    player.setDlcProp(alt.hash(props.glasses.dlc), 1, props.glasses.drawable, props.glasses.texture);
    player.setDlcProp(alt.hash(props.ear.dlc), 2, props.ear.drawable, props.ear.texture);
    player.setDlcProp(alt.hash(props.watch.dlc), 6, props.watch.drawable, props.watch.texture);
    player.setDlcProp(alt.hash(props.bracelet.dlc), 7, props.bracelet.drawable, props.bracelet.texture);
};
