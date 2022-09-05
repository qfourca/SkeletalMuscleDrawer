import { Moment } from "../../../animation";
import Animator from "../../../animator";
import UIRoot from "../../ui";

export default class Bar extends UIRoot {
    protected progress: HTMLElement
    protected currentBall: HTMLElement
    protected animator: Animator
    protected current: number = 1
    protected maximum: number = -1
    private moments: Array<HTMLDivElement> = new Array()
    public picked: Moment = { postures: [], time: 0 }
    constructor(
        parent: HTMLElement,
        animator: Animator,
    ) {
        super(parent)
        this.animator = animator

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
            temp.id = String(i + this.moments.length)
            temp.addEventListener('click', (event) => {
                //@ts-ignore
                this.picked = animation[Number(event.target.id)]
            })
            this.append(temp)
            this.moments.push(temp)
        }
        const pickedIdx = this.animator.getMomentIdx(this.picked)
        this.moments.forEach((element: HTMLDivElement, idx: number) => {
            const { reservation, run } = this.animator.getTime(idx)
            element.style.left = 'calc(' + ((reservation + run)  / this.maximum) * 100 + '% - 20px)'
            if(pickedIdx === idx) element.style.backgroundColor = 'orange'
            else if(element.style.backgroundColor === 'orange') element.style.backgroundColor = 'green'
        })
    }
}