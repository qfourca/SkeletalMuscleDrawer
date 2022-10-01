import { Controller } from "../../state";
import { InterfaceNode } from "../common/types";
//@ts-ignore
import S from '../styles/index.scss'

export default class ProgressContainer extends InterfaceNode {
    constructor (
        parent: InterfaceNode
    ) {
        super(parent, 'div', S.ProgressBarContainer)
        this.append(new ProgressBar(this))
        this.me.addEventListener('click', () => {
            console.log("SEX ")
        })
    }
}

class ProgressBar extends InterfaceNode {
    constructor (
        parent: InterfaceNode
    ) {
        super(parent, 'div', S.ProgressBar)
        new ProgressBall(this)
    }
    public onUpdate(): void {
        this.me.style.width = (InterfaceNode.controller.getCurrentTime() / InterfaceNode.controller.getMaximumTime()) * 100 + "%"
    }
}

class ProgressBall extends InterfaceNode {
    private dragBuffer: number = 0
    constructor (
        parent: InterfaceNode
    ) {
        super(parent, 'div', S.ProgressBall)
        this.me.addEventListener('mousedown', this.drag.bind(this))
    }
    private drag() {
        const mouseMove = (e: MouseEvent) => {
            this.dragBuffer += e.movementX
        }
        const mouseUp = (e: Event) => {
            InterfaceNode.controller.setPaused(false)
            document.removeEventListener('mousemove', mouseMove)
            document.removeEventListener('mouseup', mouseUp)
        }
        InterfaceNode.controller.setPaused(true)
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
    }
    public onUpdate(): void {
        //@ts-ignore
        const maxWidth = +window.getComputedStyle(this.parent.parent.me!).width.replace('px', '')
        InterfaceNode.controller.jump((this.dragBuffer / maxWidth) * InterfaceNode.controller.getMaximumTime() )
        this.dragBuffer = 0
    } 
}