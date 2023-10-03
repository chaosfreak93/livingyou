import * as alt from 'alt-shared';

export default interface IGasPump {
    model: string;
    position: alt.Vector3;
    fuelType: {
        diesel: boolean;
        benzin: boolean;
        eletric: boolean;
        cerosin: boolean;
        air: boolean;
        water: boolean;
    };
}
