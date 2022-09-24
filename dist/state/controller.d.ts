import State from "./state";
export default class Controller {
    private state;
    getCurrentTime: () => number;
    setCurrentTime: (time: number) => string;
    constructor(state: State);
}
