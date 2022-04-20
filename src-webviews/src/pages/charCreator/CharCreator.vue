<template>
    <div>
        <div id="info" v-if="pages.info">
            <p>Info</p>
            <input type="text" v-model="firstName" placeholder="Vorname" />
            <input type="text" v-model="secondName" placeholder="Zweitname (Optional)" />
            <input type="text" v-model="lastName" placeholder="Nachname" />
            <p>Age</p>
            <input type="date" v-model="birthday" />
            <p>Gender</p>
            <select v-model="gender" v-on:change="changeGender">
                <option :value="'male'">Male</option>
                <option :value="'female'">Female</option>
            </select>
            <div v-if="errorMessage">
                {{ errorMessage }}
            </div>
            <br />
            <input type="button" value="Nächste Seite" v-on:click="finishCharInfo()" />
        </div>
        <div id="parents" v-if="pages.parents">
            <p style="color: white">Mother</p>
            <input
                type="range"
                min="0"
                max="45"
                v-model="headBlendData.mother"
                step="1"
                v-on:input="setHeadBlendData"
            />
            <p style="color: white">Father</p>
            <input
                type="range"
                min="0"
                max="45"
                v-model="headBlendData.father"
                step="1"
                v-on:input="setHeadBlendData"
            />
            <p style="color: white">similarityAnatomy</p>
            <input
                type="range"
                min="0.0"
                max="1.0"
                v-model="headBlendData.similarityAnatomy"
                step="0.025"
                v-on:input="setHeadBlendData"
            />
            <p style="color: white">similaritySkinColor</p>
            <input
                type="range"
                min="0.0"
                max="1.0"
                v-model="headBlendData.similaritySkinColor"
                step="0.025"
                v-on:input="setHeadBlendData"
            />
            <br />
            <input type="button" value="Vorherige Seite" v-on:click="switchPage(0)" />
            <input type="button" value="Nächste Seite" v-on:click="switchPage(2)" />
        </div>
        <div id="face" v-if="pages.face">
            <div id="faceFeature" v-for="(item, index) in faceFeature" :key="index">
                <div>
                    <p style="color: white">{{ item.name }}</p>
                    <input
                        type="range"
                        min="-1.0"
                        max="1.0"
                        v-model="item.scale"
                        step="0.025"
                        v-on:input="setFaceFeature(index)"
                    />
                </div>
            </div>
            <input type="button" value="Vorherige Seite" v-on:click="switchPage(1)" />
            <input type="button" value="Nächste Seite" v-on:click="switchPage(3)" />
        </div>
        <div id="overlays" v-if="pages.overlays">
            <div id="headOverlay" v-for="(item, index) in headOverlay" :key="index">
                <div>
                    <p style="color: white">{{ item.name }}</p>
                    <input
                        type="number"
                        min="-1"
                        :max="item.maxIndex"
                        v-model="item.index"
                        step="1"
                        v-on:input="setHeadOverlay(index)"
                    />
                    <input
                        type="range"
                        min="0.0"
                        max="1.0"
                        v-model="item.opacity"
                        step="0.025"
                        v-on:input="setHeadOverlay(index)"
                    />
                    <div v-if="item.colorType != 0">
                        <input
                            type="number"
                            min="0"
                            max="63"
                            v-model="item.colorIndex"
                            step="1"
                            v-on:input="setHeadOverlayColor(index)"
                        />
                    </div>
                </div>
            </div>
            <input type="button" value="Vorherige Seite" v-on:click="switchPage(2)" />
            <input type="button" value="Nächste Seite" v-on:click="switchPage(4)" />
        </div>

        <div id="eyeColor" v-if="pages.eyeColor">
            <input type="range" min="1" max="31" v-model="eyeColor" step="1" v-on:input="setEyeColor()" />
            <br>
            <input type="button" value="Vorherige Seite" v-on:click="switchPage(3)" />
            <input type="button" value="Nächste Seite" v-on:click="switchPage(5)" />
        </div>
        <div id="hairColor" v-if="pages.clothes">
            <input type="range" min="0" max="63" v-model="hairColor.colorId" step="1" v-on:input="setHairColor()" />
            <input
                type="range"
                min="0"
                max="63"
                v-model="hairColor.highlightColorId"
                step="1"
                v-on:input="setHairColor()"
            />
        </div>
        <div id="clothing" v-if="pages.clothes">
            <div id="clothes" v-for="(item, index) in clothes" :key="index">
                <p style="color: white;">{{ item.name }}</p>
                <input type="number" min="0" v-model="item.drawable" step="1" v-on:input="setClothes(index)"/>
                <input type="number" min="0" v-model="item.texture" step="1" v-on:input="setClothes(index)"/>
            </div>
            <div id="props" v-for="(item, index) in props" :key="index">
                <p style="color: white;">{{ item.name }}</p>
                <input type="number" min="0" v-model="item.drawable" step="1" v-on:input="setProps(index)"/>
                <input type="number" min="0" v-model="item.texture" step="1" v-on:input="setProps(index)"/>
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
            pages: {
                info: false,
                parents: false,
                face: false,
                overlays: false,
                eyeColor: false,
                clothes: false,
            },
            firstName: '',
            secondName: '',
            lastName: '',
            birthday: '',
            gender: 'male',
            headBlendData: {
                mother: 0,
                father: 0,
                similarityAnatomy: 0.5,
                similaritySkinColor: 0.5,
            },
            faceFeature: [
                {
                    name: 'Nose_Width',
                    scale: 0,
                },
                {
                    name: 'Nose_Peak_Hight',
                    scale: 0,
                },
                {
                    name: 'Nose_Peak_Lenght',
                    scale: 0,
                },
                {
                    name: 'Nose_Bone_High',
                    scale: 0,
                },
                {
                    name: 'Nose_Peak_Lowering',
                    scale: 0,
                },
                {
                    name: 'Nose_Bone_Twist',
                    scale: 0,
                },
                {
                    name: 'EyeBrown_High',
                    scale: 0,
                },
                {
                    name: 'EyeBrown_Forward',
                    scale: 0,
                },
                {
                    name: 'Cheeks_Bone_High',
                    scale: 0,
                },
                {
                    name: 'Cheeks_Bone_Width',
                    scale: 0,
                },
                {
                    name: 'Cheeks_Width',
                    scale: 0,
                },
                {
                    name: 'Eyes_Openning',
                    scale: 0,
                },
                {
                    name: 'Lips_Thickness',
                    scale: 0,
                },
                {
                    name: 'Jaw_Bone_Width',
                    scale: 0,
                },
                {
                    name: 'Jaw_Bone_Back_Lenght',
                    scale: 0,
                },
                {
                    name: 'Chimp_Bone_Lowering',
                    scale: 0,
                },
                {
                    name: 'Chimp_Bone_Lenght',
                    scale: 0,
                },
                {
                    name: 'Chimp_Bone_Width',
                    scale: 0,
                },
                {
                    name: 'Chimp_Hole',
                    scale: 0,
                },
                {
                    name: 'Neck_Thikness',
                    scale: 0,
                },
            ],
            headOverlay: [
                {
                    name: 'Blemishes',
                    index: -1,
                    maxIndex: 23,
                    opacity: 1.0,
                    colorType: 0,
                    colorIndex: 0,
                },
                {
                    name: 'Facial Hair',
                    index: -1,
                    maxIndex: 28,
                    opacity: 1.0,
                    colorType: 1,
                    colorIndex: 0,
                },
                {
                    name: 'Eyebrows',
                    index: -1,
                    maxIndex: 33,
                    opacity: 1.0,
                    colorType: 1,
                    colorIndex: 0,
                },
                {
                    name: 'Ageing',
                    index: -1,
                    maxIndex: 14,
                    opacity: 1.0,
                    colorType: 0,
                    colorIndex: 0,
                },
                {
                    name: 'Makeup',
                    index: -1,
                    maxIndex: 74,
                    opacity: 1.0,
                    colorType: 0,
                    colorIndex: 0,
                },
                {
                    name: 'Blush',
                    index: -1,
                    maxIndex: 6,
                    opacity: 1.0,
                    colorType: 2,
                    colorIndex: 0,
                },
                {
                    name: 'Complexion',
                    index: -1,
                    maxIndex: 11,
                    opacity: 1.0,
                    colorType: 0,
                    colorIndex: 0,
                },
                {
                    name: 'Sun Damage',
                    index: -1,
                    maxIndex: 10,
                    opacity: 1.0,
                    colorType: 0,
                    colorIndex: 0,
                },
                {
                    name: 'Lipstick',
                    index: -1,
                    maxIndex: 9,
                    opacity: 1.0,
                    colorType: 2,
                    colorIndex: 0,
                },
                {
                    name: 'Moles/Freckles',
                    index: -1,
                    maxIndex: 17,
                    opacity: 1.0,
                    colorType: 0,
                    colorIndex: 0,
                },
                {
                    name: 'Chest Hair',
                    index: -1,
                    maxIndex: 16,
                    opacity: 1.0,
                    colorType: 1,
                    colorIndex: 0,
                },
                {
                    name: 'Body Blemishes',
                    index: -1,
                    maxIndex: 11,
                    opacity: 1.0,
                    colorType: 0,
                    colorIndex: 0,
                },
                {
                    name: 'Add Body Blemishes',
                    index: -1,
                    maxIndex: 1,
                    opacity: 1.0,
                    colorType: 0,
                    colorIndex: 0,
                },
            ],
            clothes: [
                {
                    name: 'head',
                    component: 0,
                    drawable: 0,
                    texture: 0,
                },
                {
                    name: 'mask',
                    component: 1,
                    drawable: 0,
                    texture: 0,
                },
                {
                    name: 'hairStyle',
                    component: 2,
                    drawable: 0,
                    texture: 0,
                },
                {
                    name: 'torso',
                    component: 3,
                    drawable: 0,
                    texture: 0,
                },
                {
                    name: 'legs',
                    component: 4,
                    drawable: 0,
                    texture: 0,
                },
                {
                    name: 'bag',
                    component: 5,
                    drawable: 0,
                    texture: 0,
                },
                {
                    name: 'shoes',
                    component: 6,
                    drawable: 0,
                    texture: 0,
                },
                {
                    name: 'accessories',
                    component: 7,
                    drawable: 0,
                    texture: 0,
                },
                {
                    name: 'undershirt',
                    component: 8,
                    drawable: 0,
                    texture: 0,
                },
                {
                    name: 'armor',
                    component: 9,
                    drawable: 0,
                    texture: 0,
                },
                {
                    name: 'decals',
                    component: 10,
                    drawable: 0,
                    texture: 0,
                },
                {
                    name: 'top',
                    component: 11,
                    drawable: 0,
                    texture: 0,
                },
            ],
            props: [
                {
                    name: 'hat',
                    component: 0,
                    drawable: 0,
                    texture: 0,
                },
                {
                    name: 'glasses',
                    component: 1,
                    drawable: 0,
                    texture: 0,
                },
                {
                    name: 'ear',
                    component: 2,
                    drawable: 0,
                    texture: 0,
                },
                {
                    name: 'watch',
                    component: 6,
                    drawable: 0,
                    texture: 0,
                },
                {
                    name: 'bracelet',
                    component: 7,
                    drawable: 0,
                    texture: 0,
                },
            ],
            eyeColor: 1,
            hairColor: {
                colorId: 0,
                highlightColorId: 0,
            },
            errorMessage: null,
        };
    },
    methods: {
        finishCharInfo() {
            if (this.firstName.length < 3) {
                this.errorMessage = 'First name must be at least 3 characters';
                return;
            }

            if (!new RegExp(/^[a-zA-Z]+$/gm).test(this.firstName)) {
                this.errorMessage = 'First name cannot include special characters';
                return;
            }

            if (this.secondName.length > 0) {
                if (this.secondName.length < 3) {
                    this.errorMessage = 'Second name must be at least 3 characters';
                    return;
                }

                if (!new RegExp(/^[a-zA-Z]+$/gm).test(this.secondName)) {
                    this.errorMessage = 'Second name cannot include special characters';
                    return;
                }
            }

            if (this.lastName.length < 3) {
                this.errorMessage = 'Last name must be at least 3 characters';
                return;
            }

            if (!new RegExp(/^[a-zA-Z]+$/gm).test(this.lastName)) {
                this.errorMessage = 'Last name cannot include special characters';
                return;
            }

            let [y, m, d] = this.birthday.split('-');
            if (y < 1940) {
                this.errorMessage = 'Minimum Year: 1940';
            }

            if (y > 2004) {
                this.errorMessage = 'Maximum Year: 2004';
            }

            this.errorMessage = null;
            this.switchPage(1);
        },
        switchPage(page) {
            this.pages.info = false;
            this.pages.parents = false;
            this.pages.face = false;
            this.pages.overlays = false;
            this.pages.eyeColor = false;
            this.pages.clothes = false;
            switch (page) {
                case 0:
                    this.pages.info = true;
                    break;
                case 1:
                    this.pages.parents = true;
                    break;
                case 2:
                    this.pages.face = true;
                    break;
                case 3:
                    this.pages.overlays = true;
                    break;
                case 4:
                    this.pages.eyeColor = true;
                    break;
                case 5:
                    this.pages.clothes = true;
                    break;
            }
        },
        changeGender() {
            if (!(`alt` in window)) {
                return;
            }

            this.headBlendData.mother = 0;
            this.headBlendData.father = 0;
            this.headBlendData.similarityAnatomy = 0.5;
            this.headBlendData.similaritySkinColor = 0.5;
            for (let i = 0; i < this.faceFeature.length; i++) {
                this.faceFeature[i].scale = 0;
            }
            for (let i = 0; i < this.headOverlay.length; i++) {
                this.headOverlay[i].index = -1;
                this.headOverlay[i].opacity = 1.0;
            }

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
                parseInt(this.headBlendData.mother),
                parseInt(this.headBlendData.father),
                parseFloat(this.headBlendData.similarityAnatomy),
                parseFloat(this.headBlendData.similaritySkinColor)
            );
        },
        setFaceFeature(index) {
            if (!(`alt` in window)) {
                return;
            }

            alt.emit('setFaceFeature', parseInt(index), parseFloat(this.faceFeature[index].scale));
        },
        setHeadOverlay(overlayId) {
            if (!(`alt` in window)) {
                return;
            }

            if (parseInt(this.headOverlay[overlayId].index) == -1) {
                alt.emit('setHeadOverlay', parseInt(overlayId), 255, parseFloat(this.headOverlay[overlayId].opacity));
            } else {
                alt.emit(
                    'setHeadOverlay',
                    parseInt(overlayId),
                    parseInt(this.headOverlay[overlayId].index),
                    parseFloat(this.headOverlay[overlayId].opacity)
                );
            }
        },
        setHeadOverlayColor(overlayId) {
            if (!(`alt` in window)) {
                return;
            }

            alt.emit(
                'setHeadOverlayColor',
                parseInt(overlayId),
                parseInt(this.headOverlay[overlayId].colorType),
                parseInt(this.headOverlay[overlayId].colorIndex)
            );
        },
        setEyeColor() {
            if (!(`alt` in window)) {
                return;
            }

            alt.emit('setEyeColor', parseInt(this.eyeColor));
        },
        setHairColor() {
            if (!(`alt` in window)) {
                return;
            }

            alt.emit('setHairColor', parseInt(this.hairColor.colorId), parseInt(this.hairColor.highlightColorId));
        },
        setClothes(index) {
            if (!(`alt` in window)) {
                return;
            }

            alt.emit('setClothes', parseInt(this.clothes[index].component), parseInt(this.clothes[index].drawable), parseInt(this.clothes[index].texture));
        },
        setProps(index) {
            if (!(`alt` in window)) {
                return;
            }

            alt.emit('setProps', parseInt(this.props[index].component), parseInt(this.props[index].drawable), parseInt(this.props[index].texture));
        }
    },
    mounted() {
        if (`alt` in window) {
            alt.emit('charCreatorReady');
            alt.on('showCreator', () => this.switchPage(0));
        } else {
            this.switchPage(0);
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
    min-height: 100%;
    background-color: rgba(0, 0, 0, 0.55);
}
</style>
