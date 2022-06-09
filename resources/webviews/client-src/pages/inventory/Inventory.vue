<template>
    <div>
        <h1 id="title">{{ title }}</h1>
        <p id="weight">{{ current_weight }}kg / {{ max_weight }}kg</p>
        <div id="itemlist">
            <div id="item" v-for="item in getItems" v-bind:key="item.id">
                {{ item.name }}
                <div v-bind:style="{ 'background-image': 'url(../../images/' + item.image + '.png)' }"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import IInventoryItem from '../../../../livingyou/shared/interface/IInventoryItem';
const ComponentName = 'Inventory';
export default defineComponent({
    name: ComponentName,
    data() {
        return {
            title: '' as string,
            current_weight: 0 as number,
            max_weight: 50 as number,
            items: [] as IInventoryItem[],
        };
    },
    methods: {
        setData(title: string, current_weight: number, max_weight: number, items: IInventoryItem[]) {
            this.title = title;
            this.current_weight = current_weight;
            this.max_weight = max_weight;
            this.items = items;
        },
    },
    computed: {
        getItems() {
            return this.items;
        },
    },
    mounted() {
        if (`alt` in window) {
            alt.emit('inventoryReady');
            alt.on('setData', this.setData);
        }
    },
});
</script>

<style scoped>
#page-Inventory {
    text-align: center;
    position: absolute;
    top: 2.5%;
    left: 1%;
    transform: translate(0%, 0%);
    width: 30vw;
    min-height: 95%;
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
