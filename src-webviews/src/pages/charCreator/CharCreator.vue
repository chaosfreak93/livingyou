<template>
    <div>
        <select v-model="gender" v-on:change="changeGender">
            <option :value="'male'">Male</option>
            <option :value="'female'">Female</option>
        </select>
        <!--<div id="fathe_mother">
            <p style="color: white">Mother</p>
            <input type="range" min="0" max="45" v-model=mother step="1" v-on:input="setHeadBlendData" />
            <p style="color: white">Father</p>
            <input type="range" min="0" max="45" v-model=father step="1" v-on:input="setHeadBlendData" />
            <p style="color: white">similarityAnatomy</p>
            <input
                type="range"
                min="0.0"
                max="1.0"
                v-model="similarityAnatomy"
                step="0.025"
                v-on:input="setHeadBlendData"
            />
            <p style="color: white">similaritySkinColor</p>
            <input
                type="range"
                min="0.0"
                max="1.0"
                v-model="similaritySkinColor"
                step="0.025"
                v-on:input="setHeadBlendData"
            />
        </div>-->
        <!--<div id="headBlendPaletteColor">
            <div>
                {{ headBlendPaletteColor[0].index }}
                <input
                    type="number"
                    min="0"
                    max="255"
                    v-model="headBlendPaletteColor[0].color.r"
                    v-on:change="setHeadBlendPaletteColor(0)"
                />
                <input
                    type="number"
                    min="0"
                    max="255"
                    v-model="headBlendPaletteColor[0].color.g"
                    v-on:change="setHeadBlendPaletteColor(0)"
                />
                <input
                    type="number"
                    min="0"
                    max="255"
                    v-model="headBlendPaletteColor[0].color.b"
                    v-on:change="setHeadBlendPaletteColor(0)"
                />
            </div>
            <div>
                {{ headBlendPaletteColor[1].index }}
                <input
                    type="number"
                    min="0"
                    max="255"
                    v-model="headBlendPaletteColor[1].color.r"
                    v-on:change="setHeadBlendPaletteColor(1)"
                />
                <input
                    type="number"
                    min="0"
                    max="255"
                    v-model="headBlendPaletteColor[1].color.g"
                    v-on:change="setHeadBlendPaletteColor(1)"
                />
                <input
                    type="number"
                    min="0"
                    max="255"
                    v-model="headBlendPaletteColor[1].color.b"
                    v-on:change="setHeadBlendPaletteColor(1)"
                />
            </div>
            <div>
                {{ headBlendPaletteColor[2].index }}
                <input
                    type="number"
                    min="0"
                    max="255"
                    v-model="headBlendPaletteColor[2].color.r"
                    v-on:change="setHeadBlendPaletteColor(2)"
                />
                <input
                    type="number"
                    min="0"
                    max="255"
                    v-model="headBlendPaletteColor[2].color.g"
                    v-on:change="setHeadBlendPaletteColor(2)"
                />
                <input
                    type="number"
                    min="0"
                    max="255"
                    v-model="headBlendPaletteColor[2].color.b"
                    v-on:change="setHeadBlendPaletteColor(2)"
                />
            </div>
            <div>
                {{ headBlendPaletteColor[3].index }}
                <input
                    type="number"
                    min="0"
                    max="255"
                    v-model="headBlendPaletteColor[3].color.r"
                    v-on:change="setHeadBlendPaletteColor(3)"
                />
                <input
                    type="number"
                    min="0"
                    max="255"
                    v-model="headBlendPaletteColor[3].color.g"
                    v-on:change="setHeadBlendPaletteColor(3)"
                />
                <input
                    type="number"
                    min="0"
                    max="255"
                    v-model="headBlendPaletteColor[3].color.b"
                    v-on:change="setHeadBlendPaletteColor(3)"
                />
            </div>
        </div>-->
        <div id="headBlendPaletteColor">
            <div>
                {{ headBlendPaletteColor[0].index }}
                <input
                    type="number"
                    min="0"
                    max="255"
                    v-model="headBlendPaletteColor[0].color.r"
                    v-on:change="setHeadBlendPaletteColor(0)"
                />
            </div>
            <div>
                {{ headBlendPaletteColor[1].index }}
                <input
                    type="number"
                    min="0"
                    max="255"
                    v-model="headBlendPaletteColor[1].color.r"
                    v-on:change="setHeadBlendPaletteColor(1)"
                />
            </div>
            <div>
                {{ headBlendPaletteColor[2].index }}
                <input
                    type="number"
                    min="0"
                    max="255"
                    v-model="headBlendPaletteColor[2].color.r"
                    v-on:change="setHeadBlendPaletteColor(2)"
                />
            </div>
            <div>
                {{ headBlendPaletteColor[3].index }}
                <input
                    type="number"
                    min="0.0"
                    max="255"
                    v-model="headBlendPaletteColor[3].color.r"
                    v-on:change="setHeadBlendPaletteColor(3)"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
const ComponentName = 'CharCreator';
export default defineComponent({
    name: ComponentName,
    components: {},
    data() {
        return {
            gender: 'male',
            headBlendData: {
                mother: 0,
                father: 0,
                similarityAnatomy: 0.5,
                similaritySkinColor: 0.5,
            },
            headBlendPaletteColor: [
                {
                    index: 0,
                    color: {
                        r: 0,
                        g: 0,
                        b: 0,
                    },
                },
                {
                    index: 1,
                    color: {
                        r: 0,
                        g: 0,
                        b: 0,
                    },
                },
                {
                    index: 2,
                    color: {
                        r: 0,
                        g: 0,
                        b: 0,
                    },
                },
                {
                    index: 3,
                    color: {
                        r: 0,
                        g: 0,
                        b: 0,
                    },
                },
            ],
        };
    },
    methods: {
        changeGender() {
            if (!(`alt` in window)) {
                return;
            }

            this.mother = 0;
            this.father = 0;
            this.similarityAnatomy = 0.5;
            this.similaritySkinColor = 0.5;

            if (this.gender == 'male') {
                alt.emit('changeGender', true);
            } else if (this.gender == 'female') {
                alt.emit('changeGender', false);
            }
        },
        setHeadBlendData() {
            if (!(`alt` in window)) {
                return;
            }

            alt.emit(
                'setHeadBlendData',
                parseInt(this.mother),
                parseInt(this.father),
                parseFloat(this.similarityAnatomy),
                parseFloat(this.similaritySkinColor)
            );
        },
        setHeadBlendPaletteColor(index) {
            if (!(`alt` in window)) {
                return;
            }

            alt.emit('setHeadBlendPaletteColor', index, this.headBlendPaletteColor[index].color);
        },
    },
    mounted() {
        if (`alt` in window) {
            alt.emit('charCreatorReady');
        }
    },
});
</script>

<style scoped>
#page-CharCreator {
    text-align: center;
    position: absolute;
    top: 0%;
    left: 0;
    transform: translate(0%, 0%);
    width: 25vw;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.55);
}
</style>
