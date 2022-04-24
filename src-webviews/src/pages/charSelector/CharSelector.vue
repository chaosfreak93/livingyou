<template>
    <div>
        <div id="characterOne">
            <div id="no_char" v-if="characters == null || characters.length <= 0" v-on:click="createCharacter()">
                <p style="color: white">Create Char</p>
            </div>
            <div id="char" v-else-if="characters.length > 0" v-on:click="selectCharacter(0)"></div>
        </div>
        <div id="characterTwo">
            <div id="char_locked" v-if="characters == null || !allowSecondCharacter">
                <p style="color: white">Slot locked</p>
            </div>
            <div id="no_char" v-else-if="characters.length <= 1" v-on:click="createCharacter()">
                <p style="color: white">Create Char</p>
            </div>
            <div id="char" v-else-if="characters.length > 1" v-on:click="selectCharacter(1)"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
const ComponentName = 'CharSelector';
export default defineComponent({
    name: ComponentName,
    components: {},
    data() {
        return {
            characters: [],
            allowSecondCharacter: null,
        };
    },
    methods: {
        setData(characters, allowSecondCharacter: boolean) {
            this.characters = characters;
            this.allowSecondCharacter = allowSecondCharacter;
        },
        updateCharSelectorUi() {
            if (this.characters.length <= 0) {
            }
        },
        selectCharacter(index) {
            if (!(`alt` in window)) {
                return;
            }

            alt.emit(
                'showPed',
                JSON.stringify(this.characters[index].characterClothing),
                JSON.stringify(this.characters[index].characterAppearence)
            );
        },
        createCharacter() {
            if (!(`alt` in window)) {
                return;
            }

            alt.emit('createCharacter');
        },
    },
    mounted() {
        if (`alt` in window) {
            alt.emit('charSelectorReady');
            alt.on('setData', this.setData);
        }
    },
});
</script>

<style scoped>
#page-CharSelector {
    text-align: center;
    position: absolute;
    top: 87.5%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 25vh;
    background-color: rgba(0, 0, 0, 0.55);
}

#characterOne {
    position: absolute;
    top: 50%;
    left: 39%;
    transform: translate(-50%, -50%);
    width: 20vw;
    height: 20vh;
    background-color: rgba(0, 0, 0, 0.8);
}

#characterOne :first-child {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}

#characterTwo {
    position: absolute;
    top: 50%;
    right: 39%;
    transform: translate(50%, -50%);
    width: 20vw;
    height: 20vh;
    background-color: rgba(0, 0, 0, 0.8);
}

#characterTwo :first-child {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
</style>
