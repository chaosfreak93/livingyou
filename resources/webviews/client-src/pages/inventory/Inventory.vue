<template>
    <div>
        <div id="actions" class="actions" style="display: none">
            <div id="use" v-on:click="useItem($event)">Benutzen</div>
            <div id="give" v-on:click="giveItem($event)">Geben an 'Not found'</div>
            <div id="drop" v-on:click="dropItem($event)">Fallenlassen</div>
        </div>
        <div id="pocketInventory" v-if="getInventory1">
            <h1 id="title">Pockets</h1>
            <p id="weight">{{ getInventory1.currentWeight }}kg / {{ getInventory1.maxWeight }}kg</p>
            <div id="itemlist">
                <div
                    id="item"
                    v-for="inventoryItem in getInventory1.items"
                    v-bind:key="inventoryItem.item.id"
                    v-bind:style="{ 'background-image': 'url(./assets/images/' + inventoryItem.item.image + '.png)' }"
                    v-on:click="openActionsMenu($event, 0, inventoryItem.item, inventoryItem.amount)"
                >
                    {{ inventoryItem.amount }}
                </div>
            </div>
        </div>
        <div id="backpackInventory" v-if="getInventory2">
            <h1 id="title">Backpack</h1>
            <p id="weight">{{ getInventory2.currentWeight }}kg / {{ getInventory2.maxWeight }}kg</p>
            <div id="itemlist">
                <div
                    id="item"
                    v-for="inventoryItem in getInventory2.items"
                    v-bind:key="inventoryItem.item.id"
                    v-bind:style="{ 'background-image': 'url(./assets/images/' + inventoryItem.item.image + '.png)' }"
                    v-on:click="openActionsMenu($event, 1, inventoryItem.item, inventoryItem.amount)"
                >
                    {{ inventoryItem.amount }}
                </div>
            </div>
        </div>
        <div id="otherInventory" v-if="getInventory3">
            <h1 id="title">Other</h1>
            <p id="weight">{{ getInventory3.currentWeight }}kg / {{ getInventory3.maxWeight }}kg</p>
            <div id="itemlist">
                <div
                    id="item"
                    v-for="inventoryItem in getInventory3.items"
                    v-bind:key="inventoryItem.item.id"
                    v-bind:style="{ 'background-image': 'url(./assets/images/' + inventoryItem.item.image + '.png)' }"
                    v-on:click="openActionsMenu($event, 2, inventoryItem.item, inventoryItem.amount)"
                >
                    {{ inventoryItem.amount }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IItem from '../../../../livingyou/shared/interface/IItem';
import IWebInventory from '../../../../livingyou/shared/interface/IWebInventory';
const ComponentName = 'Inventory';
export default defineComponent({
    name: ComponentName,
    data() {
        return {
            inventory1: null as IWebInventory,
            inventory2: null as IWebInventory,
            inventory3: null as IWebInventory,
        };
    },
    methods: {
        setData(inventory1: IWebInventory, inventory2: IWebInventory, inventory3: IWebInventory) {
            this.inventory1 = inventory1;
            if (inventory2) {
                this.inventory2 = inventory2;
            }
            if (inventory3) {
                this.inventory3 = inventory3;
            }
        },
        openActionsMenu(event: MouseEvent, inventory: number, item: IItem, amount: number): void {
            if (document.getElementById('actions').style.display == 'none') {
                document.getElementById('actions').style.display = 'block';
                document.getElementById('actions').style.top = event.pageY + 'px';
                document.getElementById('actions').style.left = event.pageX + 'px';
                document.getElementById('actions').dataset.inventory = JSON.stringify(inventory);
                document.getElementById('actions').dataset.item = JSON.stringify({ ...item, amount });
            }
        },
        closeActionsMenu(): void {
            if (document.getElementById('actions').style.display == 'block') {
                document.getElementById('actions').style.display = 'none';
                document.getElementById('actions').style.top = '0px';
                document.getElementById('actions').style.left = '0px';
            }
        },
        useItem(event: MouseEvent): void {
            if (!(`alt` in window)) {
                return;
            }
            // @ts-ignore
            alt.emit('useItem', event.target.parentElement.dataset.inventory, event.target.parentElement.dataset.item);
            this.closeActionsMenu();
        },
        giveItem(event: MouseEvent): void {
            this.closeActionsMenu();
        },
        dropItem(event: MouseEvent): void {
            if (!(`alt` in window)) {
                return;
            }
            // @ts-ignore
            alt.emit('dropItem', event.target.parentElement.dataset.inventory, event.target.parentElement.dataset.item);
            this.closeActionsMenu();
        },
    },
    computed: {
        getInventory1: function (): IWebInventory {
            return this.inventory1;
        },
        getInventory2: function (): IWebInventory {
            return this.inventory2;
        },
        getInventory3: function (): IWebInventory {
            return this.inventory3;
        },
    },
    mounted() {
        if (`alt` in window) {
            alt.emit('inventoryReady');
            alt.on('setData', this.setData);
        } else {
            this.setData(
                {
                    currentWeight: 0,
                    maxWeight: 50,
                    items: [
                        {
                            item: {
                                id: '62b4388e3cd1640f71307efc',

                                name: 'Bier',
                                description: 'Eine Flasche Bier',
                                weight: 0.3,
                                image: 'beer',
                                data: { thirst: 10 },
                                flags: {
                                    droppable: true,
                                    useable: true,
                                    giveable: true,
                                },
                            },
                            amount: 1,
                        },
                    ],
                },
                {
                    currentWeight: 0,
                    maxWeight: 50,
                    items: [
                        {
                            item: {
                                id: '62b4388e3cd1640f71307efc',

                                name: 'Bier',
                                description: 'Eine Flasche Bier',
                                weight: 0.3,
                                image: 'beer',
                                data: { thirst: 10 },
                                flags: {
                                    droppable: true,
                                    useable: true,
                                    giveable: true,
                                },
                            },
                            amount: 1,
                        },
                    ],
                },
                { currentWeight: 0, maxWeight: 50, items: [] }
            );
        }
    },
});
</script>

<style scoped>
#page-Inventory {
    color: white;
    text-align: center;
    padding: 1%;
    height: 95%;
    width: 100%;
    display: grid;
    grid-template-columns: 27.5% 27.5% 27.5%;
    gap: 40px;
    justify-content: center;
    align-items: center;
}
#pocketInventory {
    width: 25vw;
    background-color: rgba(0, 0, 0, 0.55);
    border-radius: 10px;
}
#backpackInventory {
    width: 25vw;
    background-color: rgba(0, 0, 0, 0.55);
    border-radius: 10px;
}
#otherInventory {
    width: 25vw;
    background-color: rgba(0, 0, 0, 0.55);
    border-radius: 10px;
}
#itemlist {
    margin: 0 25px;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    gap: 10px;
    justify-content: center;
    align-items: center;
}
#item {
    position: relative;
    border: 0.2px solid white;
    border-radius: 5px;
    width: 70px;
    height: 74px;
    background-color: transparent;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
#actions {
    position: absolute;
    background-color: grey;
    z-index: 1;
}
#use {
    border-top: 0.1px solid black;
    border-left: 0.1px solid black;
    border-right: 0.1px solid black;
}
#give {
    border: 0.1px solid black;
}
#drop {
    border-left: 0.1px solid black;
    border-right: 0.1px solid black;
    border-bottom: 0.1px solid black;
}
</style>
