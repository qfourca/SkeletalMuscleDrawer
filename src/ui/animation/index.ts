import UI from "./ui";
import TimeLine from '../../timeline';
import Human from "../../human";
import UIRoot from '../ui'
export default class Animation implements UIRoot{
    private parent: HTMLElement
    private timeLine: TimeLine = new TimeLine()
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
                { func: () => { this.timeLine.push(this.human.getPosture(), this.debugUI.getTime()); this.debugUI.timeLineChange() }, expression: "timeline" },
                { func: () => { this.timeLine.download() }, expression: "download" },
                { func: () => { console.log(this.debugUI.getTime()) }, expression: "test" },
            ],
            this.timeLine
        )
        this.human.executeOnLoad(() => {
            this.debugUI.setBone(this.human.selectBone.bind(this.human))
            this.debugUI.setOptions(this.human.getBones())
        })
    }
}