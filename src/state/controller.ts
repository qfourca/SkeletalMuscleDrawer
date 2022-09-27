import State from "./state";

export default class Controller {
    private state: State
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
    constructor (
        state: State
    ) {
        this.state = state
    }
}