//@ts-ignore
import S from './style.scss'
export default abstract class Child {
    protected abstract big: string;
    protected abstract middle: string;
    protected parent: Element
    protected reset: () => void
    constructor (
        parent: Element,
        reset: () => void
    ) {
        this.parent = parent
        this.reset = reset
    }
    public sizeUp() {
        this.parent.classList.add(S.max)
        this.parent.innerHTML = this.big
        document.getElementsByClassName(S.back)[0].addEventListener("click", this.reset.bind(this))
    }
    public sizeMiddle() {
        this.parent.classList.remove(S.min)
        this.parent.classList.remove(S.max)
        this.parent.innerHTML = this.middle
    }
    public sizeDown() {
        this.parent.innerHTML = ""
        this.parent.classList.add(S.min)
    }
}