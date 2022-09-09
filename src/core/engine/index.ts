import Human from "../human";
import Animation from "../animation";
import {
    LoadAble,
    UpdateAble
} from '../../interface'
export default class Engine implements UpdateAble {
    private human: Human
    private animation: Animation
    public currentTime: number = 0
    public isPaused: boolean = false
    constructor (
        human: Human,
        animation: Animation
    ) {
        this.human = human
        this.animation = animation
    }
    public update = (interval: number) => {
        this.currentTime += interval
        const current = this.animation.finder.getTimePosture(this.currentTime, this.human.getBoneNames())
        current.forEach((value, key) => {
            //@ts-ignore
            this.human.getBone(key)?.rotation.set(value._x, value._y, value._z, value._order)
        })
        // const test = "Neck"
        // const testCurrent = current.get(test)
        // if(testCurrent != undefined) {
        //     //@ts-ignore
        //     this.human.getBone(test)?.rotation.set(testCurrent._x, testCurrent._y, testCurrent._z)
        // }
    }
}