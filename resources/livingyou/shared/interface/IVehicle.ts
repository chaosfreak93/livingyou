export default interface IVehicle {
    class:
        | 'Compact'
        | 'Sedan'
        | 'SUV'
        | 'Coupe'
        | 'Muscle Car'
        | 'Sports Classic'
        | 'Sport'
        | 'Super'
        | 'Motorcycle'
        | 'Off-Road'
        | 'Industrial'
        | 'Utility'
        | 'Van'
        | 'Cycle'
        | 'Boat'
        | 'Helicopter'
        | 'Plane'
        | 'Service'
        | 'Emergency'
        | 'Military'
        | 'Commercial'
        | 'Train'
        | 'Open Wheel';
    manufacturer: string;
    model: string;
    hash: string;
    data: {
        engine_type: 'Diesel' | 'Benzin' | 'Elektro' | 'Hybrid' | 'Kerosin' | 'None';
        max_fuel_level: number;
        fuel_consumption: number;
        max_oil_level: number;
        seats: number;
        trunk_size: number;
    };
}
