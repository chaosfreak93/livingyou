import * as alt from 'alt-server';
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
        actionMenuOpen: boolean;
        screenEffect: {
            name: string;
            ticks: number;
        };

        setPosition(x: number, y: number, z: number): void;
        time(): void;
        weather(): void;
        startScreenEffect(effectName: string, ticks: number, looped: boolean): void;
        stopScreenEffect(effectName: string): void;

        updateFood(food: number): void;
        updateThirst(thirst: number): void;

        // Inventory
        addItemToPockets(id: string, amount?: number): void;
        removeItemFromPockets(id: string, amount?: number): void;
        addItemToBackpack(id: string, amount?: number): void;
        removeItemFromBackpack(id: string, amount?: number): void;

        // Clothing
        setHead(drawable: number, texture: number, applyClothing: boolean): void;
        setMask(drawable: number, texture: number, applyClothing: boolean): void;
        setHairStyle(drawable: number, texture: number, applyClothing: boolean): void;
        setTorso(drawable: number, texture: number, applyClothing: boolean): void;
        setLegs(drawable: number, texture: number, applyClothing: boolean): void;
        setBag(drawable: number, texture: number, applyClothing: boolean): void;
        setShoes(drawable: number, texture: number, applyClothing: boolean): void;
        setAccessories(drawable: number, texture: number, applyClothing: boolean): void;
        setUndershirt(drawable: number, texture: number, applyClothing: boolean): void;
        setClothArmor(drawable: number, texture: number, applyClothing: boolean): void;
        setDecals(drawable: number, texture: number, applyClothing: boolean): void;
        setTop(drawable: number, texture: number, applyClothing: boolean): void;

        // Props
        setHat(drawable: number, texture: number, applyClothing: boolean): void;
        setGlasses(drawable: number, texture: number, applyClothing: boolean): void;
        setEar(drawable: number, texture: number, applyClothing: boolean): void;
        setWatch(drawable: number, texture: number, applyClothing: boolean): void;
        setBracelet(drawable: number, texture: number, applyClothing: boolean): void;

        applyClothing(): void;
    }
}

alt.Player.prototype.setPosition = function setPosition(x: number, y: number, z: number): void {
    if (!this.hasModel) {
        this.hasModel = true;
        this.spawn(x, y, z, 0);
        this.model = 'mp_m_freemode_01';
    }

    this.pos = new alt.Vector3(x, y, z);
};

alt.Player.prototype.time = function time(): void {
    EmitClient(this, 'world:UpdateTime', World.getWorldHour(), World.getWorldMinute());
};

alt.Player.prototype.weather = function weather(): void {
    EmitClient(this, 'world:UpdateWeather', World.getWeatherByGrid(World.getGridSpace(this)));
};

alt.Player.prototype.startScreenEffect = function startScreenEffect(
    effectName: string,
    ticks: number,
    looped: boolean = false
): void {
    if (looped || ticks == 0) {
        this.screenEffect = {
            name: effectName,
            ticks: ticks,
        };
        EmitClient(this, 'player:StartScreenEffect', effectName, ticks * 5000, looped);
    } else {
        this.screenEffect = {
            name: effectName,
            ticks: parseInt((ticks / 5000).toFixed(0)),
        };
        EmitClient(this, 'player:StartScreenEffect', effectName, ticks, looped);
    }
};

alt.Player.prototype.stopScreenEffect = function stopScreenEffect(effectName: string): void {
    EmitClient(this, 'player:StopScreenEffect', effectName);
};

// Inventory
alt.Player.prototype.addItemToPockets = function addItemToPockets(id: string, amount?: number): void {
    let item: IItem = Items.getItemById(id);
    if (!item) return;
    let inventoryItem: IInventoryItem = this.character.pocketInventory.items.find((value) => value.id == id);
    if (inventoryItem) {
        if (amount) {
            inventoryItem.amount += amount;
        } else {
            inventoryItem.amount += 1;
        }
    } else {
        if (amount) {
            this.character.pocketInventory.items.push({ id: item.id, amount: amount });
        } else {
            this.character.pocketInventory.items.push({ amount: 1, id: item.id });
        }
    }
};

alt.Player.prototype.removeItemFromPockets = function removeItemFromPockets(id: string, amount?: number): void {
    let item: any = Items.getItemById(id);
    if (!item) return;
    item = this.character.pocketInventory.items.find((value) => value.id == id);
    if (!item) return;
    if (amount && item.amount - amount >= 1) {
        item.amount -= amount;
    } else {
        const index = this.character.pocketInventory.items.indexOf(item);
        this.character.pocketInventory.items.splice(index, 1);
    }
};

alt.Player.prototype.addItemToBackpack = function addItemToBackpack(id: string, amount?: number): void {
    let item: IItem = Items.getItemById(id);
    if (!item) return;
    let inventoryItem: IInventoryItem = this.character.backpackInventory.items.find((value) => value.id == id);
    if (inventoryItem) {
        if (amount) {
            inventoryItem.amount += amount;
        } else {
            inventoryItem.amount += 1;
        }
    } else {
        if (amount) {
            this.character.backpackInventory.items.push({ id: item.id, amount: amount });
        } else {
            this.character.backpackInventory.items.push({ amount: 1, id: item.id });
        }
    }
};

alt.Player.prototype.removeItemFromBackpack = function removeItemFromBackpack(id: string, amount?: number): void {
    let item: any = Items.getItemById(id);
    if (!item) return;
    item = this.character.backpackInventory.items.find((value) => value.id == id);
    if (!item) return;
    if (amount && item.amount - amount >= 1) {
        item.amount -= amount;
    } else {
        const index = this.character.backpackInventory.items.indexOf(item);
        this.character.backpackInventory.items.splice(index, 1);
    }
};

// Food & Thirst
alt.Player.prototype.updateFood = function updateFood(food: number): void {
    this.character.hunger += food;
    if (this.character.hunger <= 0) {
        this.character.hunger = 0;
    } else if (this.character.hunger >= 100) {
        this.character.hunger = 100;
    }
};
alt.Player.prototype.updateThirst = function updateThirst(thirst: number): void {
    this.character.thirst += thirst;
    if (this.character.thirst <= 0) {
        this.character.thirst = 0;
    } else if (this.character.thirst >= 100) {
        this.character.thirst = 100;
    }
};

// Clothing
alt.Player.prototype.setHead = function setHead(drawable: number, texture: number, applyClothing: boolean): void {
    this.character.characterClothing.clothes[0].drawable = drawable;
    this.character.characterClothing.clothes[0].texture = texture;
    if (applyClothing) {
        this.applyClothing();
    }
};

alt.Player.prototype.setMask = function setMask(drawable: number, texture: number, applyClothing: boolean): void {
    this.character.characterClothing.clothes[1].drawable = drawable;
    this.character.characterClothing.clothes[1].texture = texture;
    if (applyClothing) {
        this.applyClothing();
    }
};

alt.Player.prototype.setHairStyle = function setHairStyle(
    drawable: number,
    texture: number,
    applyClothing: boolean
): void {
    this.character.characterClothing.clothes[2].drawable = drawable;
    this.character.characterClothing.clothes[2].texture = texture;
    if (applyClothing) {
        this.applyClothing();
    }
};

alt.Player.prototype.setTorso = function setTorso(drawable: number, texture: number, applyClothing: boolean): void {
    this.character.characterClothing.clothes[3].drawable = drawable;
    this.character.characterClothing.clothes[3].texture = texture;
    if (applyClothing) {
        this.applyClothing();
    }
};

alt.Player.prototype.setLegs = function setLegs(drawable: number, texture: number, applyClothing: boolean): void {
    this.character.characterClothing.clothes[4].drawable = drawable;
    this.character.characterClothing.clothes[4].texture = texture;
    if (applyClothing) {
        this.applyClothing();
    }
};

alt.Player.prototype.setBag = function setBag(drawable: number, texture: number, applyClothing: boolean): void {
    this.character.characterClothing.clothes[5].drawable = drawable;
    this.character.characterClothing.clothes[5].texture = texture;
    if (applyClothing) {
        this.applyClothing();
    }
};

alt.Player.prototype.setShoes = function setShoes(drawable: number, texture: number, applyClothing: boolean): void {
    this.character.characterClothing.clothes[6].drawable = drawable;
    this.character.characterClothing.clothes[6].texture = texture;
    if (applyClothing) {
        this.applyClothing();
    }
};

alt.Player.prototype.setAccessories = function setAccessories(
    drawable: number,
    texture: number,
    applyClothing: boolean
): void {
    this.character.characterClothing.clothes[7].drawable = drawable;
    this.character.characterClothing.clothes[7].texture = texture;
    if (applyClothing) {
        this.applyClothing();
    }
};

alt.Player.prototype.setUndershirt = function setUndershirt(
    drawable: number,
    texture: number,
    applyClothing: boolean
): void {
    this.character.characterClothing.clothes[8].drawable = drawable;
    this.character.characterClothing.clothes[8].texture = texture;
    if (applyClothing) {
        this.applyClothing();
    }
};

alt.Player.prototype.setClothArmor = function setClothArmor(
    drawable: number,
    texture: number,
    applyClothing: boolean
): void {
    this.character.characterClothing.clothes[9].drawable = drawable;
    this.character.characterClothing.clothes[9].texture = texture;
    if (applyClothing) {
        this.applyClothing();
    }
};

alt.Player.prototype.setDecals = function setDecals(drawable: number, texture: number, applyClothing: boolean): void {
    this.character.characterClothing.clothes[10].drawable = drawable;
    this.character.characterClothing.clothes[10].texture = texture;
    if (applyClothing) {
        this.applyClothing();
    }
};

alt.Player.prototype.setTop = function setTop(drawable: number, texture: number, applyClothing: boolean): void {
    this.character.characterClothing.clothes[11].drawable = drawable;
    this.character.characterClothing.clothes[11].texture = texture;
    if (applyClothing) {
        this.applyClothing();
    }
};

// Props
alt.Player.prototype.setHat = function setHat(drawable: number, texture: number, applyClothing: boolean): void {
    this.character.characterClothing.props[0].drawable = drawable;
    this.character.characterClothing.props[0].texture = texture;
    if (applyClothing) {
        this.applyClothing();
    }
};

alt.Player.prototype.setGlasses = function setGlasses(drawable: number, texture: number, applyClothing: boolean): void {
    this.character.characterClothing.props[1].drawable = drawable;
    this.character.characterClothing.props[1].texture = texture;
    if (applyClothing) {
        this.applyClothing();
    }
};

alt.Player.prototype.setEar = function setEar(drawable: number, texture: number, applyClothing: boolean): void {
    this.character.characterClothing.props[2].drawable = drawable;
    this.character.characterClothing.props[2].texture = texture;
    if (applyClothing) {
        this.applyClothing();
    }
};

alt.Player.prototype.setWatch = function setWatch(drawable: number, texture: number, applyClothing: boolean): void {
    this.character.characterClothing.props[3].drawable = drawable;
    this.character.characterClothing.props[3].texture = texture;
    if (applyClothing) {
        this.applyClothing();
    }
};

alt.Player.prototype.setBracelet = function setBracelet(
    drawable: number,
    texture: number,
    applyClothing: boolean
): void {
    this.character.characterClothing.props[4].drawable = drawable;
    this.character.characterClothing.props[4].texture = texture;
    if (applyClothing) {
        this.applyClothing();
    }
};

alt.Player.prototype.applyClothing = function applyClothing(): void {
    let clothes = this.character.characterClothing.clothes;
    let props = this.character.characterClothing.props;

    for (let i = 0; i < clothes.length; i++) {
        this.setClothes(clothes[i].component, clothes[i].drawable, clothes[i].texture, 0);
    }

    for (let i = 0; i < props.length; i++) {
        this.setProp(props[i].component, clothes[i].drawable, clothes[i].texture);
    }
};
