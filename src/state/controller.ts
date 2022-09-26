import State from "./state";

export default class Controller {
    private state: State
    public getCurrentTime = () => this.state.currentTime
    public getMaximumTime = () => this.state.maximumTime
    public getPaused = () => this.state.isPaused
    public setCurrentTime = (time: number) => { this.state.currentTime = time }
    public setMaximumTime = (time: number) => { this.state.maximumTime = time }
    public setPaused = (pause: boolean) => { this.state.isPaused = pause }
    public jump = (time: number) => { 
        const change = this.getCurrentTime() + time
        if(change < 0) { this.setCurrentTime(0) }
        else if(change > this.getMaximumTime() ) { this.setCurrentTime(this.getCurrentTime()) }
        else this.setCurrentTime(change) 
    }
    constructor (
        state: State
    ) {
        this.state = state
    }
}