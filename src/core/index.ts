import { AppManager, AppMember } from "../app";
import { LoadAble, RenderAble } from "../interface";
import { Scene } from "../three";

import Human from "./human";
import Animation from "./animation";

export default class Core extends AppMember implements LoadAble {
    private onLoadFunctions: Array<() => void> = new Array()
    public onLoad = (func: () => any) => { this.onLoadFunctions.push(func); if(!this.getIsLoading()){ func() } }

    private isLoading = true
    public getIsLoading = () => this.isLoading

    private human: Human
    private animation: Animation
    constructor (
        parent: HTMLElement,
        appManager: AppManager,
        humanFile: string,
        animationFile: string | any,
        scene: Scene
    ) {
        super(parent, appManager)
        this.human = new Human(humanFile)
        this.human.onLoad(() => {
            this.human.render(scene)
        })
        this.animation = new Animation(animationFile)
    }
    
    public update = (interval: number) => {

    }

    public getAnimationRunning = () => { }
    public setAnimationRunning = () => { }
    public getCurrentProgress = () => { }
    public setCurrentProgress = () => { }
}