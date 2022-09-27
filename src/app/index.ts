import { Scene } from "three"
import Core from "../core"
import UI from "../interface"
import { Controller, State, Option } from "../state"
import Three from "../three"
import { Performance } from "../util"
export default class App extends Controller {
    private scene: Scene
    private three: Three
    private core: Core
    private ui: UI
    private performance: Performance = new Performance()
    constructor (
        parent: HTMLElement,
        human: string,
        animation: string | any,
        option?: Option
    ) {
        super({
            currentTime: 0,
            maximumTime: 0,
            isPaused: false,
            option: option === undefined ? {} : option
        })
        this.three = new Three(parent)
        this.scene = this.three.getScene()
        this.core = new Core(human, animation, this.scene, this)
        this.ui = new UI(parent, this, parent)
        this.ui.render()
        this.update()
    }
    public update() {
        this.performance.start()
        requestAnimationFrame(this.update.bind(this))
        const interval = this.performance.getInterval()
        if(this.getCurrentTime() < this.getMaximumTime() 
            && !this.getPaused()) {
            this.setCurrentTime(this.getCurrentTime() + interval)
        }
        this.three.update()
        this.core.update()
        this.ui.update(interval)
        this.performance.end()
    }
}
export {
    Option as Option
}