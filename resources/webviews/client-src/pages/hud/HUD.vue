<template>
    <div>
        <div id="hud"></div>
        <div id="vehicle_hud" v-if="showVehicleHud">
            <div id="speedometer">
                <div id="speedometer_body">
                    <div id="speedometer_fill" :style="'transform: rotate(' + vehicleRpm / 2 + 'turn)'"></div>
                    <div id="speedometer_cover">{{ vehicleSpeed }}km/h</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { WebViewEvents } from '../../../../livingyou/shared/enums/WebViewEvents';
const ComponentName = 'HUD';
export default defineComponent({
    name: ComponentName,
    data() {
        return {
            vehicleRpm: 0 as number,
            vehicleSpeed: 0 as number,
            showVehicleHud: false as boolean,
        };
    },
    methods: {
        openVehicleHud() {
            this.showVehicleHud = true;
        },
        closeVehicleHud() {
            this.showVehicleHud = false;
        },
        updateVehicleData(rpm: number, speed: number) {
            this.vehicleRpm = rpm;
            this.vehicleSpeed = speed;
        },
    },
    mounted() {
        if (`alt` in window) {
            alt.emit(WebViewEvents.HUD_READY);
            alt.on(WebViewEvents.HUD_OPEN_VEHICLE_HUD, this.openVehicleHud);
            alt.on(WebViewEvents.HUD_CLOSE_VEHICLE_HUD, this.closeVehicleHud);
            alt.on(WebViewEvents.HUD_UPDATE_VEHICLE_DATA, this.updateVehicleData);
        }
    },
});
</script>

<style scoped>
#page-HUD {
    text-align: center;
}

#vehicle_hud {
    width: 100%;
    max-width: 250px;
    position: absolute;
    bottom: 0;
    right: 0;
}

#speedometer {
    width: 100%;
    max-width: 250px;
}

#speedometer_body {
    width: 100%;
    height: 0;
    padding-bottom: 50%;
    background: #b4c0be;
    position: relative;
    border-top-left-radius: 100% 200%;
    border-top-right-radius: 100% 200%;
    overflow: hidden;
}

#speedometer_fill {
    position: absolute;
    top: 100%;
    left: 0;
    width: inherit;
    height: 100%;
    background: #009578;
    transform-origin: center top;
    transform: rotate(0.25turn);
    transition: transform 0.2s ease-out;
}

#speedometer_cover {
    width: 75%;
    height: 150%;
    background: #ffffff;
    border-radius: 50%;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);

    /* Text */
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 25%;
    box-sizing: border-box;
}
</style>
