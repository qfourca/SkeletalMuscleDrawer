
import { UI as UIRoot, AnimationUI, ProductionUI } from './ui'
import Core from './core'
import Human from "./human";
import Animation from './animation';
import Animator from './animator';
import {
    Performance
} from './util'

export default class App {

    private core: Core
    private parent:HTMLElement

    private human:Human
    private animator:Animator
    private ui: UIRoot

    private performance:Performance = new Performance()

    private option:Option
    constructor(
        parent: HTMLElement,
        human: string,
        animation: any,
        option?: Option
    ) {
        this.parent = parent
        this.option = option == undefined ? { } : option
        
        this.core = new Core(this.parent)
        this.human = new Human(human, this.core.getScene())
        this.animator = new Animator()
        this.human.execute(() => {
            this.animator.animate(new Animation(animation), this.human.skeleton)
        })

        if(this.option.UI === UI.animation) this.ui = new AnimationUI(this.parent, this.animator, this.human)
        else if(this.option.UI === UI.production) this.ui = new ProductionUI(this.parent, this.animator)
        else this.ui = new ProductionUI(this.parent, this.animator)
        this.ui.render()
        
        this.update()
    }
    private update() {
        requestAnimationFrame(this.update.bind(this))
        const interval = this.performance.getInterval()
        this.performance.start()
        this.ui.update(interval)
        this.animator.update(interval)
        this.core.update()
        this.performance.end()
    }
}

export interface Option {
    UI?: number
}

export const UI = {
    production: 0,
    animation: 1
}