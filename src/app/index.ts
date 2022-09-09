import EventManager from '../event'
import {
    Performance
} from '../util'
import AppManager, {
    Option
} from './appManager'
import AppMember from './appMember'

import Three from '../three'
import Core from '../core'

export default class App {
    private performance:Performance = new Performance()
    private appManager: AppManager 

    private three: Three
    private core: Core

    private parent: HTMLElement
    private option:Option
    constructor(
        parent: HTMLElement,
        human: string,
        animation: string | any,
        option?: Option
    ) {
        this.parent = parent
        this.option = option === undefined ? { } : option
        this.appManager = {
            eventManager: new EventManager(),
            option: this.option
        }
        this.three = new Three(this.parent, this.appManager)
        this.core = new Core(this.appManager, human, animation, this.three.getScene())
        this.update()
    }
    private update() {
        requestAnimationFrame(this.update.bind(this))
        const interval = this.performance.getInterval()
        this.performance.start()

        this.three.update(interval)
        this.core.update(interval)

        this.performance.end()
    }
}

export { 
    AppManager as AppManager, 
    AppMember as AppMember
}