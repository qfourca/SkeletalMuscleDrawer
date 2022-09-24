import { Euler } from "three";
import Animation from "./";
export default class Finder {
    private animation;
    constructor(animation: Animation);
    getTimePosture(time: number, boneNames: Array<string>): Map<string, Euler>;
    getTimeToIndex(time: number): number;
    getRootPosture(idx: number, boneName: string): Euler;
}
