import UIRoot from "../../ui";
import Animator from "../../../animator";
import './style.scss'
import Bar from "./bar";
import Functions from "./functions";
export default class TimeLineUI extends UIRoot {
    private animator: Animator
    private functions: Functions
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
        this.functions = new Functions(this.element, root, this.animator)

        this.progressBar.render()
        this.functions.render()
        
    }
    public update() {
        this.progressBar.update()
    }

}