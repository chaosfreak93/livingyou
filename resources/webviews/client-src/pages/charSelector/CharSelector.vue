<template>
    <div>
        <div id="characterOne">
            <div id="no_char" v-if="characters == null || characters.length <= 0" v-on:click="openCharCreator()">
                <p style="color: white">Create Char</p>
            </div>
            <div id="char" v-else-if="characters.length > 0" v-on:click="selectCharacter(0)">
                <p style="color: white">{{ characters[0].firstName }} {{ characters[0].lastName }}</p>
            </div>
        </div>
        <div id="characterTwo">
            <div id="char_locked" v-if="characters == null || !allowSecondCharacter">
                <p style="color: white">Slot locked</p>
            </div>
            <div id="no_char" v-else-if="characters.length <= 1" v-on:click="openCharCreator()">
                <p style="color: white">Create Char</p>
            </div>
            <div id="char" v-else-if="characters.length > 1" v-on:click="selectCharacter(1)">
                <p style="color: white">{{ characters[1].firstName }} {{ characters[1].lastName }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { WebViewEvents } from '../../../../livingyou/shared/enums/WebViewEvents';
import ICharacter from '../../../../livingyou/shared/interface/ICharacter';
const ComponentName = 'CharSelector';
export default defineComponent({
    name: ComponentName,
    data() {
        return {
            characters: [] as ICharacter[],
            selectedCharacter: null as ICharacter,
            allowSecondCharacter: false as boolean,
        };
    },
    methods: {
        setData(characters: ICharacter[], allowSecondCharacter: boolean) {
            this.characters = characters;
            this.allowSecondCharacter = allowSecondCharacter;
        },
        selectCharacter(index: number) {
            if (!(`alt` in window)) {
                return;
            }

            if (this.selectedCharacter == null || this.selectedCharacter !== this.characters[index]) {
                this.selectedCharacter = this.characters[index];
                alt.emit(
                    WebViewEvents.CHAR_SELECTOR_SHOW_PED,
                    JSON.stringify(this.characters[index].characterClothing),
                    JSON.stringify(this.characters[index].characterAppearence)
                );
                return;
            } else if (this.selectedCharacter !== null && this.selectedCharacter == this.characters[index]) {
                alt.emit(WebViewEvents.CHAR_SELECTOR_SELECT_CHARACTER, JSON.stringify(this.selectedCharacter));
            }
        },
        openCharCreator() {
            if (!(`alt` in window)) {
                return;
            }

            alt.emit(WebViewEvents.CHAR_SELECTOR_OPEN_CHAR_CREATOR);
        },
    },
    mounted() {
        if (`alt` in window) {
            alt.emit(WebViewEvents.CHAR_SELECTOR_READY);
            alt.on(WebViewEvents.CHAR_SELECTOR_SET_DATA, this.setData);
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
}

#characterTwo {
    position: absolute;
    top: 50%;
    right: 39%;
    transform: translate(50%, -50%);
    width: 20vw;
    height: 20vh;
}

#char {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}

#no_char {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../images/new_char.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

#char_locked {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../images/lock.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
</style>
