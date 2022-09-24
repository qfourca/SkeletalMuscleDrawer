import State from "./state";

export default class Controller {
    private state: State
    public getCurrentTime = () => { return this.state.currentTime }
    public setCurrentTime = (time: number) => { this.state.currentTime = time; return "OK" }
    constructor (
        state: State
    ) {
        this.state = state
    }
}