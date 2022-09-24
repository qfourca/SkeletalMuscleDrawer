declare const bind: Array<bind>;
export default bind;
export interface bind {
    target: string;
    posename: string;
    direction: string;
    delta?: (arg: number) => number;
}
