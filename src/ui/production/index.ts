import TimeLineUI from './timelineUI'
import UIRoot from '../ui'
import Animation from '../../animation'

import './index.scss'

export default class ProductionUI extends UIRoot{
    private static WaitTime: number = 1000
    private timeLineUI: UIRoot
    private display: number = ProductionUI.WaitTime
    constructor(
        parent: HTMLElement,
        animation: Animation
    ) {
        super(parent)
        this.parent.classList.add("SMD-UI")
        this.element.className = "production-ui"
        this.timeLineUI = new TimeLineUI(this.element, animation, this.parent)
        this.parent.addEventListener('mousemove', this.show.bind(this))
        // this.show()
    }
    private show() {
        this.display = ProductionUI.WaitTime
        if(this.element.className === 'production-ui')
            this.element.className = 'production-ui display'
    }
    private hide() {
        if(this.element.className === 'production-ui display')
        this.element.className = 'production-ui'
    }
    public render() {
        this.parent.appendChild(this.element)
        this.timeLineUI.render()
    }
    public update(interval: number) {
        this.display -= interval
        if(this.display < 0) {
            this.hide()
        }
        this.timeLineUI.update(interval)
    }
}