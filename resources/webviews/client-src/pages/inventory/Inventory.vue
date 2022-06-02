<template>
    <div>
        <h1 id="title">{{ title }}</h1>
        <p id="weight">{{ current_weight }}kg / {{ max_weight }}kg</p>
        <div id="itemlist">
            <div id="item" v-for="item in getItems" v-bind:key="item.index"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
const ComponentName = 'Inventory';
export default defineComponent({
    name: ComponentName,
    data() {
        return {
            title: '',
            current_weight: 0,
            max_weight: 50,
            items: [],
        };
    },
    methods: {
        setData(title, current_weight, max_weight, items) {
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
