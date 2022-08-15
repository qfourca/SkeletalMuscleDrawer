import Human from "../../human"
import UIRoot from '../ui'
import Animation from '../../animation'
import Buttons from "./buttons"
import Controller from './controller/index'
import TimeLine from "./timeline"
import './style.scss'
import Animator from "../../animator"
export default class AnimationUI extends UIRoot{
    private animation: Animation = new Animation()
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
        this.human = human
        this.parent.classList.add("SMD-UI")
        this.element.className = "animation-ui"

        this.buttons = new Buttons(this.element, [
                { onClick: () => { console.log(this.animation) }, expression: "print" },
                { onClick: () => { this.animation.clonePush(this.human.getPosture(), 1000)}, expression: "timeline" },
                { onClick: () => { this.animation.download() }, expression: "download" }
            ]
        )
        this.controller = new Controller(this.element, this.human)
        this.timeLine = new TimeLine(this.element, animator, this.parent)
    }
    render() {
        this.parent.appendChild(this.element)
        this.buttons.render()
        this.controller.render()
        this.timeLine.render()
    }
    public update(interval: number): void {
        this.timeLine.update()
    }
}