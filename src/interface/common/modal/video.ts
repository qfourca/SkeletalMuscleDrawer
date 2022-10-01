//@ts-ignore
import S from './style.scss'
export default class Realtime {
    private static readonly big = `
        <div class="${S.max_container}">
            <button class="${S.back}">뒤로</button>
            <input class="${S.fir_number}" type="number"></input>
            <input class="${S.fir_range}" type="range" max="100" min="1"></input>
            <button>sumbit</button>
        </div>
    `
    private static readonly middle = `
        <h1>비디오 분석</h1>
    `
    private parent: Element
    private reset: () => void
    constructor (
        parent: Element,
        reset: () => void
    ) {
        this.parent = parent
        this.reset = reset
        this.sizeMiddle()
        
    }
    public sizeUp() {
        this.parent.classList.add(S.max)
        this.parent.innerHTML = Realtime.big
        document.getElementsByClassName(S.back)[0].addEventListener("click", this.reset.bind(this))
    }
    public sizeMiddle() {
        this.parent.classList.remove(S.min)
        this.parent.classList.remove(S.max)
        this.parent.innerHTML = Realtime.middle
    }
    public sizeDown() {
        this.parent.innerHTML = ""
        this.parent.classList.add(S.min)
    }
}