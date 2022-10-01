import { InterfaceNode, InterfaceRoot } from "../common/types";
//@ts-ignore
import S from './style.scss'
export default class Realtime extends InterfaceNode {
    private static readonly html = `
        <video class"${S.hashVideo}"></video>
        <div class="${S.counter}">0</div>
    `
    private value: number = 0
    private counterElement: Element
    constructor(
        parent: InterfaceNode | InterfaceRoot
    ) {
        super(parent, "div", S.realtimeContainer)
        this.me.innerHTML = Realtime.html
        this.counterElement = this.me.getElementsByClassName(S.counter)[0]
        this.hide()
        this.setCounter(0)
    }
    private setCounter(value: number) {
        this.value = value
        this.counterElement.innerHTML = String(value)
    }
    private getCounter(): number {
        return this.value
    }
    private getVideo() {
        this.me.getElementsByClassName(S.hashVideo)
    }
    private hide() {
        this.me.classList.add(S.hide)
    }
    private display() {
        this.me.classList.remove(S.remove)
    }
}