import IVehicle from "./IVehicle";

export default interface IPlayerVehicle extends IVehicle {
    id: string;
    ownerId: string;
}
