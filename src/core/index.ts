import { Scene } from "three"
import Updater from "../controller"
import Hook from "../hook"
export default class Core {
    public static core: Core
    public root: Hook<HTMLElement>
    public scene: Hook<THREE.Scene>
    public currentTime: Hook<number> = new Hook(0)
    public maximumTime: Hook<number> = new Hook(0)
    public isRunning: Hook<boolean> = new Hook(false)
    public mapLoading: Hook<number> = new Hook(0)
    public subtitle: Hook<string> = new Hook("")
    public analysis: Hook<{mode: string, data: any}> = new Hook({mode: "default", data: "$no"})

    private updater: Updater = new Updater()
    constructor (
        root: HTMLElement,
        scene: Scene
    ) {
        Core.core = this
        this.root = new Hook(root)
        this.scene = new Hook(scene)
    }
    public patchTask = this.updater.push.bind(this.updater)
    public dispatchTask = this.updater.dispatch.bind(this.updater)
    public setTime(time: number) {
        if(time < 0) this.setTime(0)
        else if(time > this.maximumTime.get()) this.setTime(this.maximumTime.get())
        else this.currentTime.set(time)
    }
}