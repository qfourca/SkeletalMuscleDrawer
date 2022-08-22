import Animator from "../../../animator";
import Animation, { Moment } from "../../../animation";
import UIRoot from "../../ui";

export default class Dev extends UIRoot {
    private lengthInput: HTMLInputElement
    private animator: Animator
    constructor(
        parent: HTMLElement,
        animator: Animator
    ) {
        super(parent)
        this.animator = animator
        this.element.className = 'dev'
        this.lengthInput = document.createElement('input')
        this.lengthInput.addEventListener('change', this.inputLength.bind(this))
        this.element.appendChild(this.lengthInput)
    }
    private inputLength() {
        this.animator.setMaximumTime(Number(this.lengthInput.value))
    }
    public update() {
        this.animator.getAnimation().forEach((element: Moment) => {
            console.log(element.time)
        })
    }
}