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
        this.me.addEventListener('click', () => {
            console.log("SEX ")
        })
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
        new ProgressBall(this, controller)
    }
    public onUpdate(): void {
        this.me.style.width = (this.controller.getCurrentTime() / this.controller.getMaximumTime()) * 100 + "%"
    }
}

class ProgressBall extends InterfaceNode {
    private dragBuffer: number = 0
    private controller: Controller
    constructor (
        parent: InterfaceNode,
        controller: Controller
    ) {
        super(parent, 'div', S.ProgressBall)
        this.controller = controller
        this.me.addEventListener('mousedown', this.drag.bind(this))
    }
    private drag() {
        const mouseMove = (e: MouseEvent) => {
            this.dragBuffer += e.movementX
        }
        const mouseUp = (e: Event) => {
            this.controller.setPaused(false)
            document.removeEventListener('mousemove', mouseMove)
            document.removeEventListener('mouseup', mouseUp)
        }
        this.controller.setPaused(true)
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
    }
    public onUpdate(): void {
        //@ts-ignore
        const maxWidth = +window.getComputedStyle(this.parent.parent.me!).width.replace('px', '')
        this.controller.jump((this.dragBuffer / maxWidth) * this.controller.getMaximumTime() )
        this.dragBuffer = 0
    } 
}