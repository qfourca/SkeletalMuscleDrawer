import Human from "../../human"
import UIRoot from '../ui'
import Animation, { Moment } from '../../animation'
import Buttons from "./buttons"
import Controller from './controller/index'
import TimeLine from "./timeline"
import './style.scss'
import Animator from "../../animator"
export default class AnimationUI extends UIRoot{
    private animator: Animator
    private human: Human
    private buttons: Buttons
    private controller: Controller
    private timeLine: TimeLine
    constructor(
        parent: HTMLElement,
        animator: Animator,
        human: Human
    ) {
        super(parent)
        this.animator = animator
        this.human = human
        this.parent.classList.add("SMD-UI")
        this.element.className = "animation-ui"

        this.buttons = new Buttons(this.element, [
                { onClick: () => { console.log(this.animator.getAnimation()) }, expression: "print" },
                { onClick: () => { this.animator.getAnimation().clonePush(this.human.getPosture(), 1000)}, expression: "timeline" },
                { onClick: () => { this.animator.getAnimation().download() }, expression: "download" }
            ]
        )
        this.controller = new Controller(this.element, this.human, animator, this.getPickedMoment.bind(this))
        this.timeLine = new TimeLine(this.element, animator, this.parent)
    }
    render() {
        this.parent.appendChild(this.element)
        this.buttons.render()
        this.controller.render()
        this.timeLine.render()
    }
    public getPickedMoment(): Moment{
        return this.timeLine.progressBar.picked
    }
    public update(interval: number): void {
        this.timeLine.update()
    }
}