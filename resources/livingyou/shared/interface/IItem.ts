export default interface IItem {
    type: 'Consumable', 'Money';
    name: string;
    weigth: number;
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
        }
    }
}
