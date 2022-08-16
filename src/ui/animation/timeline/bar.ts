import { Moment } from "../../../animation";
import Animator from "../../../animator";
import UIRoot from "../../ui";

export default class Bar extends UIRoot {
    protected progress: HTMLElement
    protected currentBall: HTMLElement
    protected animator: Animator
    private pickedMoment: Moment
    protected current: number = 1
    protected maximum: number = -1
    private moments: Array<HTMLDivElement> = new Array()
    constructor(
        parent: HTMLElement,
        animator: Animator
    ) {
        super(parent)
        this.animator = animator
        this.pickedMoment = this.animator.getAnimation()[0]

        this.element.className = 'timeLine'

        this.progress = document.createElement('div')
        this.progress.className = 'progress'
        this.append(this.progress)

        this.currentBall = document.createElement('div')
        this.currentBall.className = 'currentBall'
        this.currentBall.addEventListener('mousedown', this.drag.bind(this))
        this.progress.appendChild(this.currentBall)
    }
    private drag(event: Event) {
        const mouseMove = (e: MouseEvent) => {
            this.move(this.current + e.movementX * this.maximum / Number(window.getComputedStyle(this.element).width.replace('px', '')))
        }
        const mouseUp = (e: Event) => {
            this.animator.start()
            document.removeEventListener('mousemove', mouseMove)
            document.removeEventListener('mouseup', mouseUp)
        }
        this.animator.pause()
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
    }

    private move(pos: number) {
        this.current = pos
        this.progress.style.width = `${(this.current / this.maximum) * 100}%`
        this.animator.setCurrentTime(pos)
        this.animator.render()
    }
    public update() {
        this.current = this.animator.getCurrentTime()
        this.maximum = this.animator.getMaximumTime()
        this.progress.style.width = `${(this.current / this.maximum) * 100}%`
        const animation = this.animator.getAnimation()
        for(let i = 0; i < animation.length - this.moments.length; i++) {
            const temp = document.createElement('div')
            temp.className = 'moment'
            temp.addEventListener('click', () => {
                this.pickedMoment = animation[i]
                console.log(this.pickedMoment)
            })
            this.append(temp)
            this.moments.push(temp)
        }
        this.moments.forEach((element: HTMLDivElement, idx: number) => {
            const { reservation, run } = this.animator.getTime(idx)
            element.style.left = ((reservation + run)  / this.maximum) * 100 + '%'
        })
    }
}