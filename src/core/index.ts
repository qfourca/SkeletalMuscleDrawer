import { AppManager, AppMember } from "../app";
import { LoadAble, RenderAble } from "../interface";
import { Scene } from "../three";

import Human from "./human";
import Animation from "./animation";
import Engine from "./engine";

export default class Core extends AppMember implements LoadAble {
    private onLoadFunctions: Array<() => void> = new Array()
    public onLoad = (func: () => any) => { this.onLoadFunctions.push(func); if(!this.getIsLoading()){ func() } }

    private isLoading = true
    public getIsLoading = () => this.isLoading

    private human: Human
    private animation: Animation
    private engine: Engine
    constructor (
        appManager: AppManager,
        humanFile: string,
        animationFile: string | any,
        scene: Scene
    ) {
        super(appManager)
        this.human = new Human(humanFile)
        this.human.onLoad(() => {
            this.human.render(scene)
        })
        this.animation = new Animation(animationFile)
        this.engine = new Engine(this.human, this.animation)
        this.appManager.stateManager.maximunTime = this.engine.maximumTime
        
        this.appManager.eventManager.add('setTime', (time: number) => {
            this.engine.currentTime = time
        })
        this.appManager.eventManager.add('start', () => {
            this.engine.isPaused = false
        })
        this.appManager.eventManager.add('pause', () => {
            this.engine.isPaused = true
        })
    }
    
    public update = (interval: number) => {
        this.checkLoad()
        if(!this.isLoading) {
            this.engine.update(interval)
            this.appManager.stateManager.currentTime = this.engine.currentTime
            this.appManager.stateManager.isPaused = this.engine.isPaused
        }
    }
    private checkLoad() {
        if(this.isLoading) {
            if(!this.animation.getIsLoading() && !this.human.getIsLoading()) {
                this.isLoading = false
                this.onLoadFunctions.forEach((func) => {
                    func()
                })
            }
        }
    }
}