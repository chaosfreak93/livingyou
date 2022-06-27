<template>
    <div>
        <div id="actions" class="actions" style="display: none">
            <div id="use" v-on:click="useItem($event)">Benutzen</div>
            <div id="give" v-on:click="giveItem($event)">Geben an 'Not found'</div>
            <div id="drop" v-on:click="dropItem($event)">Fallenlassen</div>
        </div>
        <div id="pocketInventory" v-if="inventory1">
            <h1 id="title">Pockets</h1>
            <p id="weight">{{ inventory1.currentWeight }}kg / {{ inventory1.maxWeight }}kg</p>
            <div id="itemlist">
                <div
                    id="item"
                    v-for="item in getInventory1Items"
                    v-bind:key="item.id"
                    :class="item.id"
                    v-bind:style="{ 'background-image': 'url(./assets/images/' + item.image + '.png)' }"
                    v-on:click="openActionsMenu($event, 0, item)"
                >
                    {{ item.amount }}
                </div>
            </div>
        </div>
        <div id="backpackInventory" v-if="inventory2">
            <h1 id="title">Backpack</h1>
            <p id="weight">{{ inventory2.currentWeight }}kg / {{ inventory2.maxWeight }}kg</p>
            <div id="itemlist">
                <div
                    id="item"
                    v-for="item in getInventory2Items"
                    v-bind:key="item.id"
                    v-bind:style="{ 'background-image': 'url(./assets/images/' + item.image + '.png)' }"
                    v-on:click="openActionsMenu($event, 1, item)"
                >
                    {{ item.amount }}
                </div>
            </div>
        </div>
        <div id="otherInventory" v-if="inventory3">
            <h1 id="title">Other</h1>
            <p id="weight">{{ inventory3.currentWeight }}kg / {{ inventory3.maxWeight }}kg</p>
            <div id="itemlist">
                <div
                    id="item"
                    v-for="item in getInventory3Items"
                    v-bind:key="item.id"
                    v-bind:style="{ 'background-image': 'url(./assets/images/' + item.image + '.png)' }"
                    v-on:click="openActionsMenu($event, 2, item)"
                >
                    {{ item.amount }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IInventory from '../../../../livingyou/shared/interface/IInventory';
import IInventoryItem from '../../../../livingyou/shared/interface/IInventoryItem';
const ComponentName = 'Inventory';
export default defineComponent({
    name: ComponentName,
    data() {
        return {
            inventory1: null as IInventory,
            inventory2: null as IInventory,
            inventory3: null as IInventory,
        };
    },
    methods: {
        setData(inventory1: IInventory, inventory2: IInventory, inventory3: IInventory) {
            this.inventory1 = inventory1;
            this.inventory1.currentWeight = this.calculateCurrentWeight(this.inventory1);
            if (inventory2) {
                this.inventory2 = inventory2;
                this.inventory2.currentWeight = this.calculateCurrentWeight(this.inventory2);
            }
            if (inventory3) {
                this.inventory3 = inventory3;
                this.inventory3.currentWeight = this.calculateCurrentWeight(this.inventory3);
            }
        },
        calculateCurrentWeight(inventory: IInventory): number {
            let weight = 0;
            for (let i = 0; i < inventory.items.length; i++) {
                weight += inventory.items[i].weight;
            }
            return weight;
        },
        openActionsMenu(event: MouseEvent, inventory: number, item: IInventoryItem): void {
            if (document.getElementById('actions').style.display == 'block') {
                document.getElementById('actions').style.display = 'none';
                document.getElementById('actions').style.top = '0px';
                document.getElementById('actions').style.left = '0px';
            }

            document.getElementById('actions').style.display = 'block';
            document.getElementById('actions').style.top = event.pageY + 'px';
            document.getElementById('actions').style.left = event.pageX + 'px';
            document.getElementById('actions').dataset.inventory = JSON.stringify(inventory);
            document.getElementById('actions').dataset.item = JSON.stringify(item);
        },
        useItem(event: MouseEvent): void {
            if (!(`alt` in window)) {
                return;
            }

            alt.emit('useItem', event.target.parentElement.dataset.inventory, event.target.parentElement.dataset.item);
        },
        giveItem(event: MouseEvent): void {},
        dropItem(event: MouseEvent): void {},
    },
    computed: {
        getInventory1Items(): IInventoryItem[] {
            return this.inventory1.items;
        },
        getInventory2Items(): IInventoryItem[] {
            return this.inventory2.items;
        },
        getInventory3Items(): IInventoryItem[] {
            return this.inventory3.items;
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
                            id: '62b4388e3cd1640f71307efc',
                            amount: 1,
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
                    ],
                },
                {
                    currentWeight: 0,
                    maxWeight: 50,
                    items: [
                        {
                            id: '62b4388e3cd1640f71307efc',
                            amount: 1,
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
    margin: 0px 25px;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    gap: 10px;
    justify-content: center;
    align-items: center;
}

#item {
    position: relative;
    border: 0.2px solid black;
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
    color: white;
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
