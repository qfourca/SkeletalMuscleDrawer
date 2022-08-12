import UIRoot from "../ui";
import Animation from "../../animation";

export default class TimeLineUI extends UIRoot {
    private width: number = 0
    private maximum: number = -1
    private current: number = -1
    private animation: Animation
    private progress: HTMLElement
    private timeLine: HTMLElement
    constructor(
        parent: HTMLElement,
        animation: Animation
    ) {
        super(parent)
        this.animation = animation
        this.element.style.height = '10%'
        this.element.style.width = '100%'
        this.element.style.background = 'linear-gradient( to top, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0.1))'
        this.element.style.position = 'absolute'
        this.element.style.bottom = '0'


        const timeLine = document.createElement('div')
        timeLine.style.width = '98%'
        timeLine.style.height = '5px'
        timeLine.style.left = '1%'
        timeLine.style.position = 'absolute'
        timeLine.style.marginTop = '20px'
        timeLine.style.backgroundColor = 'rgba(150, 150, 150, 0.8)'
        

        const progress = document.createElement('div')
        progress.style.width = '50%'
        progress.style.height = '5px'
        progress.style.position = 'absolute'
        progress.style.backgroundColor = 'red'

        const currentBall = document.createElement('div')
        currentBall.style.width = '20px'
        currentBall.style.height = '20px'
        currentBall.style.borderRadius = '50%'
        currentBall.style.backgroundColor = 'red'
        currentBall.style.position = 'absolute'
        currentBall.style.right = '0'
        currentBall.style.bottom = '-7px'
        currentBall.style.cursor = 'pointer'

        progress.appendChild(currentBall)
        timeLine.appendChild(progress)
        
        currentBall.addEventListener('mousedown', this.drag.bind(this))

        this.element.appendChild(timeLine)
        this.progress = progress
        this.timeLine = timeLine
    }
    public update() {
        this.current = this.animation.getCurrentTime()
        this.maximum = this.animation.getMaximumTime()
        this.progress.style.width = `${(this.current / this.maximum) * 100}%`
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
        this.animation.stop()
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
    }
    public move(pos: number) {
        this.current = pos
        this.progress.style.width = `${(this.current / this.maximum) * 100}%`
        this.animation.setCurrentTime(pos)
        this.animation.render()
    }
    
}