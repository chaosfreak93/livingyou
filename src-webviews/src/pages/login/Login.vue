<template>
    <div>
        <h2>Login</h2>
        <button @click="startLogin">Start Login</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
const ComponentName = 'Login';
export default defineComponent({
    name: ComponentName,
    components: {},
    data() {
        return {
            url: null,
        };
    },
    methods: {
        startLogin() {
            if (!(`alt` in window)) {
                return;
            }

            alt.emit('startLogin');
        },
    }
});
</script>

<style scoped>
#page-Login {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25vw;
    height: 30vh;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 15px;
}

h2 {
    color: orange;
    font-family: sans-serif;
}

button {
    position: absolute;
    bottom: 2%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 30px;
    width: 85px;
    font-size: 12px;
}
</style>
