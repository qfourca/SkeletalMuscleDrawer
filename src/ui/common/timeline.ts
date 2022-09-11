import { AppManager } from "../../app";
import UIMember from "./uimember";

export default class TimeLine extends UIMember{
    constructor (
        parent: HTMLElement,
        appManager: AppManager
    ) {
        super(parent, 'div', TimeLine.name)
        this.appendChild(new ProgressBarContainer(this.me, appManager))
    }

    protected onUpdate = () => {
    }
}

class ProgressBarContainer extends UIMember {
    constructor(
        parent: HTMLElement,
        appManager: AppManager
    ) {
        super(parent, 'div', ProgressBarContainer.name)
        this.appendChild(new ProgressBar(this.me, appManager))
    }
}
class ProgressBar extends UIMember {
    private appManager: AppManager
    constructor (
        parent: HTMLElement,
        appManager: AppManager
    ) {
        super(parent, 'div', ProgressBar.name)
        this.appManager = appManager
        this.appendChild(new ProgressBall(this.me, appManager))
    }
    protected onUpdate: (interval: number) => void = () => {
        const { currentTime, maximunTime } = this.appManager.stateManager
        const currentPercent = (currentTime / maximunTime) * 100
        // console.log(currentTime)
        this.me.style.width = currentPercent + '%'
    };
}
class ProgressBall extends UIMember {
    private appManager: AppManager
    private dragBuffer: number = 0
    constructor (
        parent: HTMLElement,
        appManager: AppManager
    ) {
        super(parent, 'div', ProgressBall.name)
        this.appManager = appManager
        this.me.addEventListener('click', () => this.appManager.eventManager.execute('setTime', 10))
        this.me.addEventListener('mousedown', this.drag.bind(this))
        this.appManager.eventManager.execute('pause')
    }
    protected onUpdate: (interval: number) => void = () => {
        const maxWidth = +window.getComputedStyle(this.parent.parentElement!).width.replace('px', '')
        const currentWidth = +window.getComputedStyle(this.parent!).width.replace('px', '')
        this.appManager.eventManager.execute('setTime', ((this.dragBuffer + currentWidth) / maxWidth) * 4000)
        this.dragBuffer = 0
    };
    private drag(event: Event) {
        const mouseMove = (e: MouseEvent) => {
            this.dragBuffer += e.movementX
        }
        const mouseUp = (e: Event) => {
            this.appManager.eventManager.execute('start')
            document.removeEventListener('mousemove', mouseMove)
            document.removeEventListener('mouseup', mouseUp)
        }
        this.appManager.eventManager.execute('pause')
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
    }
}