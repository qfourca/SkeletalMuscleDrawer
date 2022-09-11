import EventManager from "../manager/event"
import StateManager from "../manager/state"
export default interface AppManager {
    eventManager: EventManager
    stateManager: StateManager
    option: Option
    uiRoot: HTMLElement
    canvas: HTMLElement
    root: HTMLElement
}

export interface Option {
    UI?: "production" | "animation"
}