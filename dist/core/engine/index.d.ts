import Human from "../human";
import Animation from "../animation";
import { Controller } from "../../state";
export default class Engine {
    private human;
    private animation;
    private controller;
    constructor(human: Human, animation: Animation, controller: Controller);
    update: () => void;
}
