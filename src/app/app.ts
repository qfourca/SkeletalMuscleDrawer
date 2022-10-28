import Hook from "../hook"
import { Member } from "./"

import { Updator } from "../update"

export default class App {
    public currentTime: Hook<number>
    public updateClock: Hook<number>
    public rootElement: Hook<Element>
    public isPaused: Hook<boolean>

    private members: Array<Member> = new Array()
    constructor (
        root: Element
    ) {
        this.currentTime = new Hook(0)
        this.updateClock = new Hook(0)
        this.rootElement = new Hook(root)
        this.isPaused = new Hook(false)

        this.members.push(new Updator(this))        
    }
    public animate(
        animation: string | object
    ) {

    }
}
