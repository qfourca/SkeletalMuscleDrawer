import EventManager from "../event"

export default interface AppManager {
    eventManager: EventManager
    option: Option
    uiRoot: HTMLElement
    canvas: HTMLElement
    root: HTMLElement
}

export interface Option {
    UI?: number
}

export const UI = {
    production: 0,
    animation: 1
}