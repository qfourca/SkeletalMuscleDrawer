import UIRoot from "../ui";
import Animation from "../../animation";

export default class TimeLineUI extends UIRoot {
    private maximum: number = 10000
    private current: number = 1000
    private animation: Animation
    private progress: HTMLElement
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

        progress.appendChild(currentBall)
        timeLine.appendChild(progress)
        this.element.appendChild(timeLine)

        this.progress = progress
    }
    public update() {
        this.current = this.animation.getCurrentTime()
        this.maximum = this.animation.getMaximumTime()
        this.progress.style.width = `${(this.current / this.maximum) * 100}%`
    }
}