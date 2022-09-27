import { Controller } from "../../state";
import { InterfaceNode } from "../common/types";
//@ts-ignore
import S from '../styles/index.scss'

export default class ProgressContainer extends InterfaceNode {
    constructor (
        parent: InterfaceNode,
        controller: Controller
    ) {
        super(parent, 'div', S.ProgressBarContainer)
        this.append(new ProgressBar(this, controller))
    }
}

class ProgressBar extends InterfaceNode {
    private controller: Controller
    constructor (
        parent: InterfaceNode,
        controller: Controller
    ) {
        super(parent, 'div', S.ProgressBar)
        this.controller = controller
        new ProgressBall(this)
    }
    public onUpdate(): void {
        this.me.style.width = (this.controller.getCurrentTime() / this.controller.getMaximumTime()) * 100 + "%"
    }
}

class ProgressBall extends InterfaceNode {
    constructor (
        parent: InterfaceNode
    ) {
        super(parent, 'div', S.ProgressBall)
    }
}