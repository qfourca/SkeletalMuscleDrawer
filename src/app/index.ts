import { Scene } from "three"
import Core from "../core"
import { Controller, State, Option } from "../state"
import Three from "../three"
export default class App extends Controller {
    private scene: Scene
    private three: Three
    private core: Core
    constructor (
        parent: HTMLElement,
        human: string,
        animation: string | any,
        option?: Option
    ) {
        const state: State = {
            currentTime: 0,
            option: option === undefined ? {} : option
        }
        super(state)
        this.three = new Three(parent)
        this.scene = this.three.getScene()
        this.core = new Core(human, animation, this.scene, this)
    }
    public update() {
        this.three.update()
        this.core.update()
    }
}
export {
    Option as Option
}