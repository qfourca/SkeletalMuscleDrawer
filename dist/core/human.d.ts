import { Bone } from "three";
import { Scene } from "../three";
export default class Human {
    private scene;
    private body;
    private bones;
    private isLoading;
    getIsLoading: () => boolean;
    constructor(file: string, scene: Scene);
    private onLoad;
    private onProgress;
    private onError;
    private setBones;
    getBone(name: string): Bone | undefined;
    private readonly BalckList;
    getBoneNames(): Array<string>;
}
