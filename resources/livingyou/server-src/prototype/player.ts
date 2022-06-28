import * as alt from 'alt-server';
import { arrayBuffer } from 'stream/consumers';
import ICharacter from '../../shared/interface/ICharacter';
import { EmitClient } from '../systems/eventSystem/emit';
import { World } from '../systems/world';
import Items from '../systems/items';
import IItem from '../../shared/interface/IItem';
import IInventoryItem from '../../shared/interface/IInventoryItem';

declare module 'alt-server' {
    export interface Player {
        hasModel?: boolean;
        character?: ICharacter;
        discordId?: number;
        nextTickTime?: number;
        inventoryOpen: boolean;
        screenEffect: {
            name: string;
            ticks: number;
        };

        setPosition(player: alt.Player, x: number, y: number, z: number): void;
        time(player: alt.Player): void;
        weather(player: alt.Player): void;
        startScreenEffect(player: alt.Player, effectName: string, ticks: number, looped: boolean): void;
        stopScreenEffect(player: alt.Player, effectName: string): void;

        updateFood(player: alt.Player, food: number): void;
        updateThirst(player: alt.Player, thirst: number): void;

        // Inventory
        addItemByName(player: alt.Player, name: string, amount?: number): void;
        addItemById(player: alt.Player, id: string, amount?: number): void;
        removeItemByName(player: alt.Player, name: string, amount?: number): void;
        removeItemById(player: alt.Player, id: string, amount?: number): void;

        // Clothing
        setHead(player: alt.Player, applyClothing: boolean, drawable: number, texture: number): void;
        setMask(player: alt.Player, applyClothing: boolean, drawable: number, texture: number): void;
        setHairStyle(player: alt.Player, applyClothing: boolean, drawable: number, texture: number): void;
        setTorso(player: alt.Player, applyClothing: boolean, drawable: number, texture: number): void;
        setLegs(player: alt.Player, applyClothing: boolean, drawable: number, texture: number): void;
        setBag(player: alt.Player, applyClothing: boolean, drawable: number, texture: number): void;
        setShoes(player: alt.Player, applyClothing: boolean, drawable: number, texture: number): void;
        setAccessories(player: alt.Player, applyClothing: boolean, drawable: number, texture: number): void;
        setUndershirt(player: alt.Player, applyClothing: boolean, drawable: number, texture: number): void;
        setClothArmor(player: alt.Player, applyClothing: boolean, drawable: number, texture: number): void;
        setDecals(player: alt.Player, applyClothing: boolean, drawable: number, texture: number): void;
        setTop(player: alt.Player, applyClothing: boolean, drawable: number, texture: number): void;

        // Props
        setHat(player: alt.Player, applyClothing: boolean, drawable: number, texture: number): void;
        setGlasses(player: alt.Player, applyClothing: boolean, drawable: number, texture: number): void;
        setEar(player: alt.Player, applyClothing: boolean, drawable: number, texture: number): void;
        setWatch(player: alt.Player, applyClothing: boolean, drawable: number, texture: number): void;
        setBracelet(player: alt.Player, applyClothing: boolean, drawable: number, texture: number): void;

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

alt.Player.prototype.time = function time(player: alt.Player) {
    EmitClient(player, 'world:UpdateTime', World.getWorldHour(), World.getWorldMinute());
};

alt.Player.prototype.weather = function weather(player: alt.Player) {
    EmitClient(player, 'world:UpdateWeather', World.getWeatherByGrid(World.getGridSpace(player)));
};

alt.Player.prototype.startScreenEffect = function startScreenEffect(
    player: alt.Player,
    effectName: string,
    ticks: number,
    looped: boolean = false
) {
    if (looped || ticks == 0) {
        player.screenEffect = {
            name: effectName,
            ticks: ticks,
        };
        EmitClient(player, 'player:StartScreenEffect', effectName, ticks * 5000, looped);
    } else {
        player.screenEffect = {
            name: effectName,
            ticks: parseInt((ticks / 5000).toFixed(0)),
        };
        EmitClient(player, 'player:StartScreenEffect', effectName, ticks, looped);
    }
};

alt.Player.prototype.stopScreenEffect = function stopScreenEffect(player: alt.Player, effectName: string) {
    EmitClient(player, 'player:StopScreenEffect', effectName);
};

// Inventory
alt.Player.prototype.addItemById = function addItemById(player: alt.Player, id: string, amount?: number): void {
    let item: IItem = Items.getItemById(id);
    if (!item) return;
    let inventoryItem: IInventoryItem = player.character.pocketInventory.items.find((value) => value.id == id);
    if (inventoryItem) {
        if (amount) {
            inventoryItem.amount += amount;
        } else {
            inventoryItem.amount += 1;
        }
    } else {
        if (amount) {
            player.character.pocketInventory.items.push({ id: item.id, amount: amount, });
        } else {
            player.character.pocketInventory.items.push({ amount: 1, id: item.id });
        }
    }
};

alt.Player.prototype.removeItemById = function removeItemById(player: alt.Player, id: string, amount?: number): void {
    let item: any = Items.getItemById(id);
    if (!item) return;
    item = player.character.pocketInventory.items.find((value) => value.id == id);
    if (!item) return;
    if (amount && item.amount - amount >= 1) {
        item.amount -= amount;
    } else {
        const index = player.character.pocketInventory.items.indexOf(item);
        player.character.pocketInventory.items.splice(index, 1);
    }
};

alt.Player.prototype.updateFood = function updateFood(player: alt.Player, food: number): void {
    player.character.hunger += food;
    if (player.character.hunger <= 0) {
        player.character.hunger = 0;
    } else if (player.character.hunger >= 100) {
        player.character.hunger = 100;
    }
};
alt.Player.prototype.updateThirst = function updateThirst(player: alt.Player, thirst: number): void {
    player.character.thirst += thirst;
    if (player.character.thirst <= 0) {
        player.character.thirst = 0;
    } else if (player.character.thirst >= 100) {
        player.character.thirst = 100;
    }
};

// Clothing
alt.Player.prototype.setHead = function setHead(
    player: alt.Player,
    applyClothing: boolean,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.clothes[0].drawable = drawable;
    player.character.characterClothing.clothes[0].texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setMask = function setMask(
    player: alt.Player,
    applyClothing: boolean,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.clothes[1].drawable = drawable;
    player.character.characterClothing.clothes[1].texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setHairStyle = function setHairStyle(
    player: alt.Player,
    applyClothing: boolean,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.clothes[2].drawable = drawable;
    player.character.characterClothing.clothes[2].texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setTorso = function setTorso(
    player: alt.Player,
    applyClothing: boolean,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.clothes[3].drawable = drawable;
    player.character.characterClothing.clothes[3].texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setLegs = function setLegs(
    player: alt.Player,
    applyClothing: boolean,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.clothes[4].drawable = drawable;
    player.character.characterClothing.clothes[4].texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setBag = function setBag(
    player: alt.Player,
    applyClothing: boolean,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.clothes[5].drawable = drawable;
    player.character.characterClothing.clothes[5].texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setShoes = function setShoes(
    player: alt.Player,
    applyClothing: boolean,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.clothes[6].drawable = drawable;
    player.character.characterClothing.clothes[6].texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setAccessories = function setAccessories(
    player: alt.Player,
    applyClothing: boolean,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.clothes[7].drawable = drawable;
    player.character.characterClothing.clothes[7].texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setUndershirt = function setUndershirt(
    player: alt.Player,
    applyClothing: boolean,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.clothes[8].drawable = drawable;
    player.character.characterClothing.clothes[8].texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setClothArmor = function setClothArmor(
    player: alt.Player,
    applyClothing: boolean,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.clothes[9].drawable = drawable;
    player.character.characterClothing.clothes[9].texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setDecals = function setDecals(
    player: alt.Player,
    applyClothing: boolean,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.clothes[10].drawable = drawable;
    player.character.characterClothing.clothes[10].texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setTop = function setTop(
    player: alt.Player,
    applyClothing: boolean,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.clothes[11].drawable = drawable;
    player.character.characterClothing.clothes[11].texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

// Props
alt.Player.prototype.setHat = function setHat(
    player: alt.Player,
    applyClothing: boolean,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.props[0].drawable = drawable;
    player.character.characterClothing.props[0].texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setGlasses = function setGlasses(
    player: alt.Player,
    applyClothing: boolean,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.props[1].drawable = drawable;
    player.character.characterClothing.props[1].texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setEar = function setEar(
    player: alt.Player,
    applyClothing: boolean,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.props[2].drawable = drawable;
    player.character.characterClothing.props[2].texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setWatch = function setWatch(
    player: alt.Player,
    applyClothing: boolean,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.props[3].drawable = drawable;
    player.character.characterClothing.props[3].texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.setBracelet = function setBracelet(
    player: alt.Player,
    applyClothing: boolean,
    drawable: number,
    texture: number
): void {
    player.character.characterClothing.props[4].drawable = drawable;
    player.character.characterClothing.props[4].texture = texture;
    if (applyClothing) {
        player.applyClothing(player);
    }
};

alt.Player.prototype.applyClothing = function applyClothing(player: alt.Player): void {
    let clothes = player.character.characterClothing.clothes;
    let props = player.character.characterClothing.props;

    for (let i = 0; i < clothes.length; i++) {
        player.setClothes(clothes[i].component, clothes[i].drawable, clothes[i].texture, 0);
    }

    for (let i = 0; i < props.length; i++) {
        player.setProp(props[i].component, clothes[i].drawable, clothes[i].texture);
    }
};
