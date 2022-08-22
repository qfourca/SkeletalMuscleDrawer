import UIRoot from "../../ui";
import Animator from "../../../animator";
import Left from './left'
import Right from './right'
import './style.scss'
import Bar from "./bar";
import Dev from "./dev";
import { Moment } from "../../../animation";
export default class TimeLineUI extends UIRoot {
    private animator: Animator
    private leftFunctionContainer: Left
    private rightFunctionContainer: Right
    public progressBar: Bar
    private dev: Dev
    constructor(
        parent: HTMLElement,
        animator: Animator,
        root: HTMLElement
    ) {
        super(parent)
        this.animator = animator
        this.element.className = 'timeline-container'

        this.progressBar = new Bar(this.element, this.animator)
        this.leftFunctionContainer = new Left(this.element, this.animator)
        this.rightFunctionContainer = new Right(this.element, root)
        this.dev = new Dev(this.element, this.animator)

        this.progressBar.render()
        this.leftFunctionContainer.render()
        this.rightFunctionContainer.render()
        this.dev.render()
    }
    public update() {
        this.leftFunctionContainer.update()
        this.progressBar.update()
    }

}