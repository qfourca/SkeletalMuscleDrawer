import TimeLineUI from './timelineUI'
import UIRoot from '../ui'
import Animation from '../../animation'
export default class ProductionUI extends UIRoot{
    private timeLineUI: UIRoot
    constructor(
        parent: HTMLElement,
        animation: Animation
    ) {
        super(parent)
        this.timeLineUI = new TimeLineUI(this.parent, animation)
    }
    public render() {
        this.timeLineUI.render()
    }
    public update() {
        this.timeLineUI.update()
    }
}