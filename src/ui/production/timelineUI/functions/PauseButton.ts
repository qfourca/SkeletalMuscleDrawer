import Animator from "../../../../animator"
import UIRoot from "../../../ui"

export default class PauseButton extends UIRoot {
    private isPaused: boolean = false
    private animator: Animator
    constructor (
        parent: HTMLElement,
        animator: Animator
    ) {
        super(parent)
        this.animator = animator
        this.element.addEventListener('click', this.click.bind(this), false)
        document.addEventListener('keydown', (e) => {
            this.click()
        }, false)
        this.element.className = 'pause-button'
        this.render()
    }
    private click() {
        if(this.isPaused) {
            this.start()
        }
        else {
            this.pause()
        }

    }
    public pause() {
        this.isPaused = true
        this.element.classList.add('pause')
        this.animator.pause()
    }
    public start() {
        this.isPaused = false
        this.element.classList.remove('pause')
        this.animator.start()
    }

}