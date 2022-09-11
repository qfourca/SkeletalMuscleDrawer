import { AppManager } from "../../app";
import UIMember from "./uimember";

export default class TimeLine extends UIMember{
    constructor (
        parent: HTMLElement,
        appManager: AppManager
    ) {
        super(parent, 'div', TimeLine.name)
        this.appendChild(new ProgressBarContainer(this.me, appManager))
        this.appendChild(new FunctionContainer(this.me, appManager))
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
    }
    protected onUpdate: (interval: number) => void = () => {
        const maxWidth = +window.getComputedStyle(this.parent.parentElement!).width.replace('px', '')
        const currentWidth = +window.getComputedStyle(this.parent!).width.replace('px', '')
        this.appManager.eventManager.execute('setTime', ((this.dragBuffer + currentWidth) / maxWidth) * 4000)
        this.dragBuffer = 0
    };
    private drag() {
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

class FunctionContainer extends UIMember {
    constructor (
        parent: HTMLElement,
        appManager: AppManager
    ) {
        super(parent, 'div', FunctionContainer.name)
        this.appendChild(new Functions(this.me, 'left', appManager))
        this.appendChild(new Functions(this.me, 'right', appManager))
    }
}
import IconInfo, {
    foward,
    fullscreen,
    replay,
    setting,
    skip_next,
    skip_previous
} from './icons'
class Functions extends UIMember {
    private readonly IconInfos: Array<IconInfo> = [
        { src: skip_previous, float: 'left' },
        { src: foward, float: 'left' },
        { src: replay, float: 'left' },
        { src: skip_next, float: 'left' },

        { src: setting, float: 'right' },
        { src: fullscreen, float: 'right' },
    ]
    constructor (
        parent: HTMLElement,
        direction: string,
        appManager: AppManager
    ) {
        super(parent, 'div', Functions.name + ' ' + direction)
        this.IconInfos.forEach((iconInfo: IconInfo) => {
            if(iconInfo.float === direction)
                this.appendChild(new Function(this.me, iconInfo))
        })
        if(direction === 'left') {
            this.appendChild(new TimeProgress(this.me, appManager))
        }
    }
}

class Function extends UIMember {
    constructor (
        parent: HTMLElement,
        iconInfo: IconInfo,
    ) {
        super(parent, 'div', Function.name + ' ' + iconInfo.float)
        this.me.style.backgroundImage = `url('${iconInfo.src}')`
        if(iconInfo.onClick != undefined) {
            this.me.addEventListener('click', iconInfo.onClick)
        }
    }
}

class TimeProgress extends UIMember {
    private appManager: AppManager
    constructor (
        parent: HTMLElement,
        appManager: AppManager
    ) {
        super(parent, 'div', TimeProgress.name)
        this.appManager = appManager
    }
    private static timeChange(ms: number): string {
        const seconds = ms / 1000
        let min:string = String(Math.round((seconds%3600) / 60))
        min = (Number(min) < 10 ? "0" : "") + min
        let sec:string = String(Math.round(seconds%60))
        sec = (Number(sec) < 10 ? "0" : "") + sec
        return `${min} : ${sec}`
    }
    protected onUpdate = () => {
        const { currentTime, maximunTime } = this.appManager.stateManager
        this.me.innerText = `${TimeProgress.timeChange(currentTime)} / ${TimeProgress.timeChange(maximunTime)}`
    }
}