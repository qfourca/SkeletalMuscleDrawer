import UIRoot from "../../ui";
import Animation from "../../../animation";
import Left from './left'
import Right from './right'
import './index.scss'
export default class TimeLineUI extends UIRoot {
    private maximum: number = -1
    private current: number = -1
    private animation: Animation
    private progress: HTMLElement
    private timeLine: HTMLElement
    private currentBall: HTMLElement

    private leftFunctionContainer: Left
    private rightFunctionContainer: Right
    constructor(
        parent: HTMLElement,
        animation: Animation,
        root: HTMLElement
    ) {
        super(parent)
        this.animation = animation

        this.element.className = 'timeline-container'

        this.timeLine = document.createElement('div')
        this.timeLine.className = 'timeLine'
        this.element.appendChild(this.timeLine)

        this.leftFunctionContainer = new Left(this.element, this.animation)
        this.rightFunctionContainer = new Right(this.element, root)

        this.progress = document.createElement('div')
        this.progress.className = 'progress'
        this.timeLine.appendChild(this.progress)

        this.currentBall = document.createElement('div')
        this.currentBall.className = 'currentBall'
        this.currentBall.addEventListener('mousedown', this.drag.bind(this))
        this.progress.appendChild(this.currentBall)
    }
    public render() {
        this.parent.appendChild(this.element)
        this.leftFunctionContainer.render()
        this.rightFunctionContainer.render()
    }
    public update() {
        this.current = this.animation.getCurrentTime()
        this.maximum = this.animation.getMaximumTime()
        this.progress.style.width = `${(this.current / this.maximum) * 100}%`
        this.leftFunctionContainer.update()
    }
    private drag(event: Event) {
        const mouseMove = (e: MouseEvent) => {
            this.move(this.current + e.movementX * this.maximum / Number(window.getComputedStyle(this.timeLine).width.replace('px', '')))
        }
        const mouseUp = (e: Event) => {
            this.animation.start()
            document.removeEventListener('mousemove', mouseMove)
            document.removeEventListener('mouseup', mouseUp)
        }
        this.animation.pause()
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
    }

    private move(pos: number) {
        this.current = pos
        this.progress.style.width = `${(this.current / this.maximum) * 100}%`
        this.animation.setCurrentTime(pos)
        this.animation.render()
    }
}