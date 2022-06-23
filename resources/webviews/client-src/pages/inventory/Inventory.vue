<template>
    <div>
        <div id="pocketInventory" v-if="inventory1">
            <h1 id="title">Pockets</h1>
            <p id="weight">{{ inventory1.currentWeight }}kg / {{ inventory1.maxWeight }}kg</p>
            <div id="itemlist">
                <div id="item" v-for="item in getInventory1Items" v-bind:key="item.id">
                    {{ item.name }}
                    <div v-bind:style="{ 'background-image': 'url(../../images/' + item.image + '.png)' }"></div>
                </div>
            </div>
        </div>
        <div id="backpackInventory" v-if="inventory2">
            <h1 id="title">Backpack</h1>
            <p id="weight">{{ inventory2.currentWeight }}kg / {{ inventory2.maxWeight }}kg</p>
            <div id="itemlist">
                <div id="item" v-for="item in getInventory2Items" v-bind:key="item.id">
                    {{ item.name }}
                    <div v-bind:style="{ 'background-image': 'url(../../images/' + item.image + '.png)' }"></div>
                </div>
            </div>
        </div>
        <div id="otherInventory" v-if="inventory3">
            <h1 id="title">Other</h1>
            <p id="weight">{{ inventory3.currentWeight }}kg / {{ inventory3.maxWeight }}kg</p>
            <div id="itemlist">
                <div id="item" v-for="item in getInventory3Items" v-bind:key="item.id">
                    {{ item.name }}
                    <div v-bind:style="{ 'background-image': 'url(../../images/' + item.image + '.png)' }"></div>
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
            this.inventory2 = inventory2;
            this.inventory3 = inventory3;
        },
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
                                useable: false,
                                giveable: true,
                            },
                        },
                    ],
                },
                { currentWeight: 0, maxWeight: 50, items: [] },
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
    width: 70px;
    height: 74px;
    background-color: #ffffff;
}
</style>
