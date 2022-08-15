import UIRoot from "../../ui";
import Animator from "../../../animator";
import Left from './left'
import Right from './right'
import './style.scss'
import Bar from "./bar";
export default class TimeLineUI extends UIRoot {
    private animator: Animator

    private leftFunctionContainer: Left
    private rightFunctionContainer: Right
    private progressBar: Bar
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

        this.progressBar.render()
        this.leftFunctionContainer.render()
        this.rightFunctionContainer.render()
    }
    public update() {
        this.leftFunctionContainer.update()
        this.progressBar.update()
    }

}