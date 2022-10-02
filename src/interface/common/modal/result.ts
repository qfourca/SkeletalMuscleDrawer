import { exerciseResult } from "."
//@ts-ignore
import S from './style.scss'
export default class Result {
    private parent: Element
    private static readonly html = `
        <div class="${S.result}"></div>
    `
    constructor (
        parent: Element
    ) {
        this.parent = parent
    }
    public show(info: exerciseResult) {
        this.parent.innerHTML = Result.html
    }
    public hide() {
        this.parent.innerHTML = ""
    }
}