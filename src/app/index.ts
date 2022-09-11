import {
    StateManager,
    EventManager
} from '../manager'
import {
    Performance
} from '../util'
import AppManager, {
    Option
} from './appManager'
import AppMember from './appMember'

import Three from '../three'
import Core from '../core'
import UI from '../ui'

export default class App {
    private performance:Performance = new Performance()
    private appManager: AppManager 

    private three: Three
    private core: Core
    private ui: UI

    private option:Option
    constructor(
        parent: HTMLElement,
        human: string,
        animation: string | any,
        option?: Option
    ) {
        this.option = option === undefined ? { } : option
        this.appManager = {
            eventManager: new EventManager(),
            stateManager: new StateManager(),
            option: this.option,
            uiRoot: this.HTMLMaker('div', 'skeletalmuscle-drawer-uiroot'),
            canvas: this.HTMLMaker('canvas', 'skeletalmuscle-drawer-canvas'),
            root: parent
        }
        this.appManager.root.appendChild(this.appManager.canvas)
    
        this.three = new Three(this.appManager)
        this.core = new Core(this.appManager, human, animation, this.three.getScene())
        this.ui = new UI(this.appManager)
        
        
        this.update()
    }
    private update() {
        requestAnimationFrame(this.update.bind(this))
        const interval = this.performance.getInterval()
        this.performance.start()

        this.ui.update(interval)
        this.three.update(interval)
        this.core.update(interval)

        this.performance.end()
    }
    private HTMLMaker(element: string, className?: string) {
        const result = document.createElement(element)
        if(className != undefined) {
            result.className = className
        }
        // this.parent.appendChild(result)
        return result
    }
}

export { 
    AppManager as AppManager, 
    AppMember as AppMember,
    Option as Option
}