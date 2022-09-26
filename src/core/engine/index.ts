import Human from "../human";
import Animation from "../animation"
import { Controller } from "../../state";
export default class Engine {
    private human: Human
    private animation: Animation
    private controller: Controller
    constructor (
        human: Human,
        animation: Animation,
        controller: Controller
    ) {
        this.human = human
        this.animation = animation
        this.controller = controller
        controller.setMaximumTime(this.animation[this.animation.length - 1].time)
    }
    public update = () => {
        const current = this.animation.finder.getTimePosture(this.controller.getCurrentTime(), this.human.getBoneNames())
        current.forEach((value, key) => {
            //@ts-ignore
            this.human.getBone(key)?.rotation.set(value._x, value._y, value._z, value._order)
        })
    }
}