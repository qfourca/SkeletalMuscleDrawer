import State from "./state";
export default class Controller {
    private state;
    getCurrentTime: () => number;
    getMaximumTime: () => number;
    setCurrentTime: (time: number) => string;
    setMaximumTime: (time: number) => void;
    constructor(state: State);
}
