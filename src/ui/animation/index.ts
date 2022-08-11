import UI from "./ui";
import Animation from '../../animation';
import Human from "../../human";
import UIRoot from '../ui'
export default class AnimationUI implements UIRoot{
    private parent: HTMLElement
    private timeLine: Animation = new Animation()
    private human: Human
    private debugUI: UI 
    constructor(
        parent: HTMLElement,
        human: Human
    ) {
        this.parent = parent
        this.human = human
        this.debugUI = new UI(this.parent, 
            [
                { func: () => { console.log(this.timeLine) }, expression: "print" },
                { func: () => { this.timeLine.clonePush(this.human.getPosture(), this.debugUI.getTime()); this.debugUI.timeLineChange() }, expression: "timeline" },
                { func: () => { this.timeLine.download() }, expression: "download" },
                { func: () => { console.log(this.debugUI.getTime()) }, expression: "test" },
            ],
            this.timeLine
        )
        this.human.execute(() => {
            this.debugUI.setBone(this.human.getBone.bind(this.human))
            this.debugUI.setOptions(this.human.getBoneNames())
        })
    }
}