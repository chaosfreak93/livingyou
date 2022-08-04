<template>
    <div>
        <div id="hud">
            <div v-if="showPlayerActionMenu" id="playerActionMenu" class="menu_container"></div>
            <div v-if="showVehicleActionMenu" id="vehicleActionMenu" class="menu_container">
                <div id="menu">
                    <li
                        style="--i: 0"
                        v-on:mouseenter="menuAction = 'changeLockState'"
                        v-on:mouseleave="if (showVehicleActionMenu) menuAction = null;"
                    >
                        <p>Schloss</p>
                    </li>
                    <li
                        style="--i: 1"
                        v-on:mouseenter="menuAction = 'refuel'"
                        v-on:mouseleave="if (showVehicleActionMenu) menuAction = null;"
                        v-if="gasPump != null"
                    >
                        <p>Tanken</p>
                    </li>
                </div>
            </div>
            <div v-if="showInVehicleActionMenu" id="inVehicleActionMenu" class="menu_container">
                <div id="menu">
                    <li
                        style="--i: 0"
                        v-on:mouseenter="menuAction = 'toggleEngine'"
                        v-on:mouseleave="if (showInVehicleActionMenu) menuAction = null;"
                    >
                        <p>Motor</p>
                    </li>
                    <li
                        style="--i: 1"
                        v-on:mouseenter="menuAction = 'changeLockState'"
                        v-on:mouseleave="if (showInVehicleActionMenu) menuAction = null;"
                    >
                        <p>Schloss</p>
                    </li>
                </div>
            </div>
        </div>
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
import IGasPump from '../../../../livingyou/shared/interface/IGasPump';
import { WebViewEvents } from '../../../../livingyou/shared/enums/WebViewEvents';
const ComponentName = 'HUD';
export default defineComponent({
    name: ComponentName,
    data() {
        return {
            vehicleRpm: 0 as number,
            vehicleSpeed: 0 as number,
            showVehicleHud: false as boolean,
            showInVehicleActionMenu: false as boolean,
            showVehicleActionMenu: false as boolean,
            showPlayerActionMenu: false as boolean,
            gasPump: null as IGasPump,
            menuAction: null as string,
            menuType: null as string,
            entityId: null as number,
        };
    },
    methods: {
        openInVehicleActions(vehicleID: number): void {
            this.menuType = 'inVehicle';
            this.entityId = vehicleID;
            this.showInVehicleActionMenu = true;
        },
        openVehicleActions(vehicleID: number, gasPump?: IGasPump): void {
            this.menuType = 'vehicle';
            this.entityId = vehicleID;
            this.showVehicleActionMenu = true;
            this.gasPump = gasPump;
        },
        openPlayerActions(playerId: number): void {
            this.menuType = 'player';
            this.entityId = playerId;
            this.showPlayerActionMenu = true;
        },
        closeActions(): void {
            this.showInVehicleActionMenu = false;
            this.showVehicleActionMenu = false;
            this.showPlayerActionMenu = false;
            alt.emit(WebViewEvents.HUD_PROCEED_ACTION, this.menuType, this.menuAction, this.entityId);
            this.gasPump = null;
            this.menuAction = null;
            this.menuType = null;
            this.entityId = null;
        },
        openVehicleHud(): void {
            this.showVehicleHud = true;
        },
        closeVehicleHud(): void {
            this.showVehicleHud = false;
        },
        updateVehicleData(rpm: number, speed: number): void {
            this.vehicleRpm = rpm;
            this.vehicleSpeed = speed;
        },
    },
    mounted() {
        if (`alt` in window) {
            alt.emit(WebViewEvents.HUD_READY);
            alt.on(WebViewEvents.HUD_OPEN_IN_VEHICLE_ACTIONS, this.openInVehicleActions);
            alt.on(WebViewEvents.HUD_OPEN_VEHICLE_ACTIONS, this.openVehicleActions);
            alt.on(WebViewEvents.HUD_OPEN_PLAYER_ACTIONS, this.openPlayerActions);
            alt.on(WebViewEvents.HUD_CLOSE_ACTIONS, this.closeActions);
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

.menu_container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

#menu {
    position: relative;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}

#menu li {
    position: absolute;
    left: 0;
    list-style: none;
    transform-origin: 100px;
    transform: rotate(calc(360deg / 8 * var(--i)));
}

#menu li p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: grey;
    border-radius: 50%;
    transform: rotate(calc(360deg / -8 * var(--i)));
    color: #111;
}

#menu li p:hover {
    color: #ff1252;
}
</style>
