import { Scene } from "../three";
import { Controller } from "../state";
export default class Core {
    private human;
    private animation;
    private engine;
    constructor(humanFile: string, animationFile: string | any, scene: Scene, app: Controller);
    private onResult;
    update: () => void;
}
