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
        this.appendChild(new ProgressBall(this.me))
    }
    protected onUpdate: (interval: number) => void = () => {
        const { currentTime, maximunTime } = this.appManager.stateManager
        const currentPercent = (currentTime / maximunTime) * 100
        this.me.style.width = currentPercent + '%'
    };
}
class ProgressBall extends UIMember {
    constructor (
        parent: HTMLElement
    ) {
        super(parent, 'div', ProgressBall.name)
    }
}