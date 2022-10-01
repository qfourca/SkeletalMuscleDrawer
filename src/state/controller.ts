import { Scene } from "../three";
import State from "./state";

export default class Controller {
    private state: State
    protected scene?: Scene
    public getScene: () => Scene = () => this.scene!
    public getCurrentTime = () => this.state.currentTime
    public getMaximumTime = () => this.state.maximumTime
    public getPaused = () => this.state.isPaused
    public setCurrentTime = (time: number) => {
        this.state.currentTime = 
            time < 0 || isNaN(time) ? 0 :
            time > this.getMaximumTime() 
            || time === Infinity ? this.getMaximumTime() : time
    }
    public setMaximumTime = (time: number) => { this.state.maximumTime = time }
    public setPaused = (pause: boolean) => { this.state.isPaused = pause }
    public jump = (time: number) => { this.setCurrentTime(this.getCurrentTime() + time) }
    public getMode = () => this.state.mode
    public setMode = (mode: string) =>  {
        this.state.mode = mode 
        this.modeChangeQueue.forEach((func: (mode: string) => void) => {
            func(this.getMode())
        })
    }
    public onModeChange = (func: (mode: string) => void) => { this.modeChangeQueue.push(func) }
    private modeChangeQueue:Array<(mode: string) => void> = new Array()
    constructor (
        state: State
    ) {
        this.state = state
    }
}