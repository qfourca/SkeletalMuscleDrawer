import Human from "../human";
import Animation from "../animation";
import {
    LoadAble,
    UpdateAble
} from '../../interface'
export default class Engine implements UpdateAble {
    private human: Human
    private animation: Animation
    public maximumTime: number
    public currentTime: number = 0
    public isPaused: boolean = false
    constructor (
        human: Human,
        animation: Animation
    ) {
        this.human = human
        this.animation = animation
        this.maximumTime = this.animation[this.animation.length - 1].time
    }
    public update = (interval: number) => {
        if(!this.isPaused) {
            this.currentTime += interval
            if(this.currentTime > this.maximumTime) {
                this.currentTime = this.maximumTime
            }
        }
        const current = this.animation.finder.getTimePosture(this.currentTime, this.human.getBoneNames())
        current.forEach((value, key) => {
            //@ts-ignore
            this.human.getBone(key)?.rotation.set(value._x, value._y, value._z, value._order)
        })
    }
}