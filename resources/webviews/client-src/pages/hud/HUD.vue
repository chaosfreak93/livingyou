<template>
    <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
const ComponentName = 'HUD';
export default defineComponent({
    name: ComponentName,
    data() {
        return {};
    },
    methods: {},
    mounted() {
        if (`alt` in window) {
        }
    },
});
</script>

<style scoped>
#page-HUD {
    text-align: center;
}
</style>
