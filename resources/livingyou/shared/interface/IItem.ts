export default interface IItem {
    name: string;
    description?: string;
    weigth: number;
    image?: string;
    data?: {
        food?: number;
        thirst?: number;
        effect?: {
            name: string;
            duration: number;
        };
        protection?: number;
        animation?: {
            dictionary: string;
            name: string;
            duration: number;
            flags: number;
        };
    };
    flags: {
        droppable: boolean;
        useable: boolean;
        giveable: boolean;
    };
}
