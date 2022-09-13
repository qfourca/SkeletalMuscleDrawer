import { AppManager } from "../../app";
import { Moment } from "../../core/animation";
import UIMember from "../common";
import TimeLine from "../common/timeline";
export default class AnimationTimeline extends TimeLine {
    private appManager: AppManager
    private momentBalls: Array<MomentBall> = new Array()
    public pickedMoment: Moment = { time: 0, postures: new Map() }
    constructor (
        parent: HTMLElement,
        appManager: AppManager
    ) {
        super(parent, appManager)
        this.appManager = appManager
        appManager.eventManager.add('animation-change', this.drawAnimationInfo.bind(this))
    }
    public drawAnimationInfo() {
        if(this.momentBalls.length < this.appManager.animation!.length) {
            const progressBarContainer = this.findChildAsClass("ProgressBarContainer")!
            this.pickedMoment = this.appManager.animation![0]
            this.appManager.animation?.forEach((moment) => {
                const temp = new MomentBall(progressBarContainer.me, moment, (moment) => {
                    this.pickedMoment = moment
                    this.drawAnimationInfo()
                })
                temp.refresh(this.pickedMoment,
                    this.appManager.animation![this.appManager.animation!.length - 1].time)
                temp.render()
                this.momentBalls.push(temp)
            })
        }
        else {
            this.momentBalls.forEach((ball) => [
                ball.refresh(this.pickedMoment)
            ])
        }
        this.appManager.eventManager.execute('moment-change', this.pickedMoment)
    }
    protected onUpdate: (interval: number) => void = () => {
        // console.log(this.pickedMoment.postures.get("Hips"))
    }
}
class MomentBall extends UIMember {
    private moment: Moment
    private maximum: number = 0
    constructor (
        parent: HTMLElement,
        moment: Moment,
        onClick: (arg: Moment) => void
    ) {
        super(parent, 'div', MomentBall.name)
        this.moment = moment
        this.me.addEventListener("click", () => {
            onClick(moment)
        })
    }
    public refresh(picked: Moment, maximun?: number) {
        if(maximun != undefined)
            this.maximum = maximun 
        this.me.style.left = `calc(${(this.moment.time / this.maximum) * 100 + "%"} - 6px)`
        this.me.style.background = (picked === this.moment ? "orange" : "green")
    }
}