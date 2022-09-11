import { AppManager } from "../../app";
import { Moment } from "../../core/animation";
import UIMember from "../common";
import TimeLine from "../common/timeline";
export default class AnimationUI extends UIMember {
    constructor (
        parent: HTMLElement,
        appManager: AppManager
    ) {
        super(parent, 'div', AnimationUI.name)
        this.appendChild(new AnimationTimeline(this.me, appManager))
    }
    protected onUpdate = (interval: number) => {

    }
}

class AnimationTimeline extends TimeLine {
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
        const progressBarContainer = this.findChildAsClass("ProgressBarContainer")!
        this.pickedMoment = this.appManager.animation![0]
        this.appManager.animation?.forEach((moment) => {
            const temp = new MomentBall(progressBarContainer.me, moment, (moment) => {
                this.pickedMoment = moment
                console.log(this.pickedMoment)
            })
            temp.refresh(this.appManager.animation![this.appManager.animation!.length - 1].time, this.pickedMoment)
            temp.render()
            this.momentBalls.push(temp)
        })
    }
}
class MomentBall extends UIMember {
    private moment: Moment
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
    public refresh(maximun: number, picked: Moment) {
        this.me.style.left = `calc(${(this.moment.time / maximun) * 100 + "%"} - 6px)`
        this.me.style.background = (picked === this.moment ? "orange" : "green")
    }
}