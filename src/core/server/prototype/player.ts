import * as alt from 'alt-server';

declare module 'alt-server' {
    export interface Player {
        hasModel?: boolean;

        setPosition(player: alt.Player, x: number, y: number, z: number): void;

        // Clothing
        setHead(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number): void;
        setMask(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number): void;
        setHairStyle(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number): void;
        setTorso(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number): void;
        setLegs(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number): void;
        setBag(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number): void;
        setShoes(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number): void;
        setAccessories(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number): void;
        setUndershirt(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number): void;
        setClothArmor(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number): void;
        setDecals(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number): void;
        setTop(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number): void;

        // Props
        setHat(player: alt.Player, dlc: string, drawable: number, texture: number): void;
        setGlasses(player: alt.Player, dlc: string, drawable: number, texture: number): void;
        setEar(player: alt.Player, dlc: string, drawable: number, texture: number): void;
        setWatch(player: alt.Player, dlc: string, drawable: number, texture: number): void;
        setBracelet(player: alt.Player, dlc: string, drawable: number, texture: number): void;
    }
}

alt.Player.prototype.setPosition = function setPosition(player: alt.Player, x: number, y: number, z: number) {
    if (!player.hasModel) {
        player.hasModel = true;
        player.spawn(x, y, z, 0);
        player.model = 'mp_m_freemode_01';
    }

    player.pos = new alt.Vector3(x, y, z);
}

// Clothing
alt.Player.prototype.setHead = function setHead(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number) {
    player.setDlcClothes(alt.hash(dlc), 0, drawable, texture, palette ? palette : null);
}

alt.Player.prototype.setMask = function setMask(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number) {
    player.setDlcClothes(alt.hash(dlc), 1, drawable, texture, palette ? palette : null);
}

alt.Player.prototype.setHairStyle = function setHairStyle(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number) {
    player.setDlcClothes(alt.hash(dlc), 2, drawable, texture, palette ? palette : null);
}

alt.Player.prototype.setTorso = function setTorso(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number) {
    player.setDlcClothes(alt.hash(dlc), 3, drawable, texture, palette ? palette : null);
}

alt.Player.prototype.setLegs = function setLegs(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number) {
    player.setDlcClothes(alt.hash(dlc), 4, drawable, texture, palette ? palette : null);
}

alt.Player.prototype.setBag = function setBag(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number) {
    player.setDlcClothes(alt.hash(dlc), 5, drawable, texture, palette ? palette : null);
}

alt.Player.prototype.setShoes = function setShoes(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number) {
    player.setDlcClothes(alt.hash(dlc), 6, drawable, texture, palette ? palette : null);
}

alt.Player.prototype.setAccessories = function setAccessories(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number) {
    player.setDlcClothes(alt.hash(dlc), 7, drawable, texture, palette ? palette : null);
}

alt.Player.prototype.setUndershirt = function setUndershirt(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number) {
    player.setDlcClothes(alt.hash(dlc), 8, drawable, texture, palette ? palette : null);
}

alt.Player.prototype.setClothArmor = function setClothArmor(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number) {
    player.setDlcClothes(alt.hash(dlc), 9, drawable, texture, palette ? palette : null);
}

alt.Player.prototype.setDecals = function setDecals(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number) {
    player.setDlcClothes(alt.hash(dlc), 10, drawable, texture, palette ? palette : null);
}

alt.Player.prototype.setTop = function setTop(player: alt.Player, dlc: string, drawable: number, texture: number, palette?: number) {
    player.setDlcClothes(alt.hash(dlc), 11, drawable, texture, palette ? palette : null);
}

// Props
alt.Player.prototype.setHat = function setHat(player: alt.Player, dlc: string, drawable: number, texture: number) {
    player.setDlcProp(alt.hash(dlc), 0, drawable, texture);
}

alt.Player.prototype.setGlasses = function setGlasses(player: alt.Player, dlc: string, drawable: number, texture: number) {
    player.setDlcProp(alt.hash(dlc), 1, drawable, texture);
}

alt.Player.prototype.setEar = function setEar(player: alt.Player, dlc: string, drawable: number, texture: number) {
    player.setDlcProp(alt.hash(dlc), 2, drawable, texture);
}

alt.Player.prototype.setWatch = function setWatch(player: alt.Player, dlc: string, drawable: number, texture: number) {
    player.setDlcProp(alt.hash(dlc), 6, drawable, texture);
}

alt.Player.prototype.setBracelet = function setBracelet(player: alt.Player, dlc: string, drawable: number, texture: number) {
    player.setDlcProp(alt.hash(dlc), 7, drawable, texture);
}