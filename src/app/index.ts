import EventManager from '../event'
import {
    Performance
} from '../util'
import AppManager, {
    Option
} from './appManager'
import AppMember from './appMember'

import Three from '../three'

export default class App {
    private performance:Performance = new Performance()
    private appManager: AppManager 
    private appMembers: Array<AppMember> = new Array()
    private parent: HTMLElement
    // private option:Option
    constructor(
        parent: HTMLElement,
        human: string,
        animation: any,
        option?: Option
    ) {
        this.parent = parent
        this.appManager = {
            eventManager: new EventManager(),
            option: option === undefined ? { } : option
        }
        this.appMembers.push(new Three(this.parent, this.appManager))
        this.update()
    }
    private update() {
        requestAnimationFrame(this.update.bind(this))
        const interval = this.performance.getInterval()
        this.performance.start()
        this.appMembers.forEach(member => {
            member.update(interval)
        })
        this.performance.end()
    }
}

export { 
    AppManager as AppManager, 
    AppMember as AppMember
}