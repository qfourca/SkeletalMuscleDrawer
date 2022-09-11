import EventManager from "../manager/event"
import StateManager from "../manager/state"
import Animation from "../core/animation";
export default interface AppManager {
    eventManager: EventManager
    stateManager: StateManager
    option: Option
    uiRoot: HTMLElement
    canvas: HTMLElement
    root: HTMLElement
    animation?: Animation
}

export interface Option {
    UI?: "production" | "animation"
}