// import UI from "./ui";
// import Animation from '../../animation';
// import Human from "../../human";
// import UIRoot from '../ui'

// export default class AnimationUI extends UIRoot{
//     private timeLine: Animation = new Animation()
//     private human: Human
//     private debugUI: UI 
//     constructor(
//         parent: HTMLElement,
//         human: Human
//     ) {
//         super(parent)
//         this.parent = parent
//         this.human = human
//         this.debugUI = new UI(this.parent, 
//             [
//                 { func: () => { console.log(this.timeLine) }, expression: "print" },
//                 { func: () => { this.timeLine.clonePush(this.human.getPosture(), this.debugUI.getTime()); this.debugUI.timeLineChange() }, expression: "timeline" },
//                 { func: () => { this.timeLine.download() }, expression: "download" },
//                 { func: () => { console.log(this.debugUI.getTime()) }, expression: "test" },
//             ],
//             this.timeLine
//         )
//         this.human.execute(() => {
//             this.debugUI.setBone(this.human.getBone.bind(this.human))
//             this.debugUI.setOptions(this.human.getBoneNames())
//         })
//     }
//     public update() {
        
//     }
// }

import Human from "../../human"
import UIRoot from '../ui'
import Animation from '../../animation'
import Buttons from "./buttons"
import Controller from './controller/index'
import './style.scss'
export default class AnimationUI extends UIRoot{
    private animation: Animation = new Animation()
    private human: Human
    private buttons: Buttons
    private controller: Controller
    constructor(
        parent: HTMLElement,
        human: Human
    ) {
        super(parent)
        this.human = human
        this.parent.classList.add("SMD-UI")
        this.element.className = "animation-ui"
        this.buttons = new Buttons(this.element, [
                { onClick: () => { console.log(this.animation) }, expression: "print" },
                { onClick: () => { this.animation.clonePush(this.human.getPosture(), 1000)}, expression: "timeline" },
                { onClick: () => { this.animation.download() }, expression: "download" }
            ]
        )
        this.controller = new Controller(this.element, this.human)
    }
    render() {
        this.parent.appendChild(this.element)
        this.buttons.render()
        this.controller.render()
    }
}