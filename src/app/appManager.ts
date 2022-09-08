import EventManager from "../event"

export default interface AppManager {
    eventManager: EventManager
    option: Option
}

export interface Option {
    UI?: number
}

export const UI = {
    production: 0,
    animation: 1
}