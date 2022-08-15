import './style.scss'
import TimeLineUI from "../../production/timelineUI";
import Animator from "../../../animator";
import Dev from './dev';
export default class TimeLine extends TimeLineUI {
    public dev:Dev
    constructor(
        parent: HTMLElement,
        animator: Animator,
        root: HTMLElement
    ) {
        super(parent, animator, root)
        this.dev = new Dev(this.element, animator)
        this.dev.render() 
    }
}