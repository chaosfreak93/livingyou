import * as alt from 'alt-server';
import ICharacter from '../../shared/interface/ICharacter';

declare module 'alt-server' {
    export interface Player {
        hasModel?: boolean;
        character?: ICharacter;

        setPosition(player: alt.Player, x: number, y: number, z: number): void;

        // Clothing
        setHead(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void;
        setMask(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void;
        setHairStyle(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void;
        setTorso(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void;
        setLegs(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void;
        setBag(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void;
        setShoes(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void;
        setAccessories(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void;
        setUndershirt(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void;
        setClothArmor(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void;
        setDecals(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void;
        setTop(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void;

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
}

// Clothing
alt.Player.prototype.setHead = function setHead(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void {
    player.character.characterClothing.clothes.head.dlc = dlc;
    player.character.characterClothing.clothes.head.drawable = drawable;
    player.character.characterClothing.clothes.head.texture = texture;
    player.character.characterClothing.clothes.head.palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
}

alt.Player.prototype.setMask = function setMask(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void {
    player.character.characterClothing.clothes.mask.dlc = dlc;
    player.character.characterClothing.clothes.mask.drawable = drawable;
    player.character.characterClothing.clothes.mask.texture = texture;
    player.character.characterClothing.clothes.mask.palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
}

alt.Player.prototype.setHairStyle = function setHairStyle(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void {
    player.character.characterClothing.clothes.hairStyle.dlc = dlc;
    player.character.characterClothing.clothes.hairStyle.drawable = drawable;
    player.character.characterClothing.clothes.hairStyle.texture = texture;
    player.character.characterClothing.clothes.hairStyle.palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
}

alt.Player.prototype.setTorso = function setTorso(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void {
    player.character.characterClothing.clothes.torso.dlc = dlc;
    player.character.characterClothing.clothes.torso.drawable = drawable;
    player.character.characterClothing.clothes.torso.texture = texture;
    player.character.characterClothing.clothes.torso.palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
}

alt.Player.prototype.setLegs = function setLegs(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void {
    player.character.characterClothing.clothes.legs.dlc = dlc;
    player.character.characterClothing.clothes.legs.drawable = drawable;
    player.character.characterClothing.clothes.legs.texture = texture;
    player.character.characterClothing.clothes.legs.palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
}

alt.Player.prototype.setBag = function setBag(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void {
    player.character.characterClothing.clothes.bag.dlc = dlc;
    player.character.characterClothing.clothes.bag.drawable = drawable;
    player.character.characterClothing.clothes.bag.texture = texture;
    player.character.characterClothing.clothes.bag.palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
}

alt.Player.prototype.setShoes = function setShoes(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void {
    player.character.characterClothing.clothes.shoes.dlc = dlc;
    player.character.characterClothing.clothes.shoes.drawable = drawable;
    player.character.characterClothing.clothes.shoes.texture = texture;
    player.character.characterClothing.clothes.shoes.palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
}

alt.Player.prototype.setAccessories = function setAccessories(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void {
    player.character.characterClothing.clothes.accessories.dlc = dlc;
    player.character.characterClothing.clothes.accessories.drawable = drawable;
    player.character.characterClothing.clothes.accessories.texture = texture;
    player.character.characterClothing.clothes.accessories.palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
}

alt.Player.prototype.setUndershirt = function setUndershirt(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void {
    player.character.characterClothing.clothes.undershirt.dlc = dlc;
    player.character.characterClothing.clothes.undershirt.drawable = drawable;
    player.character.characterClothing.clothes.undershirt.texture = texture;
    player.character.characterClothing.clothes.undershirt.palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
}

alt.Player.prototype.setClothArmor = function setClothArmor(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void {
    player.character.characterClothing.clothes.armor.dlc = dlc;
    player.character.characterClothing.clothes.armor.drawable = drawable;
    player.character.characterClothing.clothes.armor.texture = texture;
    player.character.characterClothing.clothes.armor.palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
}

alt.Player.prototype.setDecals = function setDecals(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void {
    player.character.characterClothing.clothes.decals.dlc = dlc;
    player.character.characterClothing.clothes.decals.drawable = drawable;
    player.character.characterClothing.clothes.decals.texture = texture;
    player.character.characterClothing.clothes.decals.palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
}

alt.Player.prototype.setTop = function setTop(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number, palette?: number): void {
    player.character.characterClothing.clothes.top.dlc = dlc;
    player.character.characterClothing.clothes.top.drawable = drawable;
    player.character.characterClothing.clothes.top.texture = texture;
    player.character.characterClothing.clothes.top.palette = palette ? palette : null;
    if (applyClothing) {
        player.applyClothing(player);
    }
}

// Props
alt.Player.prototype.setHat = function setHat(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number): void {
    player.character.characterClothing.props.hat.dlc = dlc;
    player.character.characterClothing.props.hat.drawable = drawable;
    player.character.characterClothing.props.hat.texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
}

alt.Player.prototype.setGlasses = function setGlasses(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number): void {
    player.character.characterClothing.props.glasses.dlc = dlc;
    player.character.characterClothing.props.glasses.drawable = drawable;
    player.character.characterClothing.props.glasses.texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
}

alt.Player.prototype.setEar = function setEar(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number): void {
    player.character.characterClothing.props.ear.dlc = dlc;
    player.character.characterClothing.props.ear.drawable = drawable;
    player.character.characterClothing.props.ear.texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
}

alt.Player.prototype.setWatch = function setWatch(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number): void {
    player.character.characterClothing.props.watch.dlc = dlc;
    player.character.characterClothing.props.watch.drawable = drawable;
    player.character.characterClothing.props.watch.texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
}

alt.Player.prototype.setBracelet = function setBracelet(player: alt.Player, applyClothing: boolean, dlc: string, drawable: number, texture: number): void {
    player.character.characterClothing.props.bracelet.dlc = dlc;
    player.character.characterClothing.props.bracelet.drawable = drawable;
    player.character.characterClothing.props.bracelet.texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
}

alt.Player.prototype.applyClothing = function applyClothing(player: alt.Player): void {
    let clothes = player.character.characterClothing.clothes;
    let props = player.character.characterClothing.props;

    player.setDlcClothes(alt.hash(clothes.head.dlc), 0, clothes.head.drawable, clothes.head.texture, clothes.head.palette);
    player.setDlcClothes(alt.hash(clothes.mask.dlc), 1, clothes.mask.drawable, clothes.mask.texture, clothes.mask.palette);
    player.setDlcClothes(alt.hash(clothes.hairStyle.dlc), 2, clothes.hairStyle.drawable, clothes.hairStyle.texture, clothes.hairStyle.palette);
    player.setDlcClothes(alt.hash(clothes.torso.dlc), 3, clothes.torso.drawable, clothes.torso.texture, clothes.torso.palette);
    player.setDlcClothes(alt.hash(clothes.legs.dlc), 4, clothes.legs.drawable, clothes.legs.texture, clothes.legs.palette);
    player.setDlcClothes(alt.hash(clothes.bag.dlc), 5, clothes.bag.drawable, clothes.bag.texture, clothes.bag.palette);
    player.setDlcClothes(alt.hash(clothes.shoes.dlc), 6, clothes.shoes.drawable, clothes.shoes.texture, clothes.shoes.palette);
    player.setDlcClothes(alt.hash(clothes.accessories.dlc), 7, clothes.accessories.drawable, clothes.accessories.texture, clothes.accessories.palette);
    player.setDlcClothes(alt.hash(clothes.undershirt.dlc), 8, clothes.undershirt.drawable, clothes.undershirt.texture, clothes.undershirt.palette);
    player.setDlcClothes(alt.hash(clothes.armor.dlc), 9, clothes.armor.drawable, clothes.armor.texture, clothes.armor.palette);
    player.setDlcClothes(alt.hash(clothes.decals.dlc), 10, clothes.decals.drawable, clothes.decals.texture, clothes.decals.palette);
    player.setDlcClothes(alt.hash(clothes.top.dlc), 11, clothes.top.drawable, clothes.top.texture, clothes.top.palette);

    player.setDlcProp(alt.hash(props.hat.dlc), 0, props.hat.drawable, props.hat.texture);
    player.setDlcProp(alt.hash(props.glasses.dlc), 1, props.glasses.drawable, props.glasses.texture);
    player.setDlcProp(alt.hash(props.ear.dlc), 2, props.ear.drawable, props.ear.texture);
    player.setDlcProp(alt.hash(props.watch.dlc), 6, props.watch.drawable, props.watch.texture);
    player.setDlcProp(alt.hash(props.bracelet.dlc), 7, props.bracelet.drawable, props.bracelet.texture);
}