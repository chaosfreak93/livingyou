export default interface IItem {
    readonly id: string;
    readonly name: string;
    readonly description?: string;
    readonly weight: number;
    readonly image?: string;
    readonly data?: {
        readonly food?: number;
        readonly thirst?: number;
        readonly screenEffect?: {
            readonly name: string;
            readonly duration: number;
            readonly looped?: boolean;
        };
        readonly protection?: number;
        readonly animation?: {
            readonly dictionary: string;
            readonly name: string;
            readonly duration: number;
            readonly flags: number;
        };
    };
    readonly flags: {
        readonly droppable: boolean;
        readonly useable: boolean;
        readonly giveable: boolean;
    };
}
