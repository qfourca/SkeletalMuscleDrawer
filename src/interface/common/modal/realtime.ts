//@ts-ignore
import S from './style.scss'
import Child from './child'
import { modalResult } from '.'
export default class Realtime extends Child {
    protected middle: string = `
        <h1>실시간 분석</h1>
    `
    protected big: string = `
        <div class="${S.max_container}">
            <button class="${S.back}">뒤로</button>
            <input class="${S.fir_number}" type="number"></input>
            <input class="${S.fir_range}" type="range" max="100" min="1"></input>
            <button class="${S.fir_submit}">sumbit</button>
        </div>`
    constructor (
        parent: Element,
        reset: () => void,
        submit: (value: modalResult) => void
    ) {
        super(parent, reset)
        this.submit = submit
        this.sizeMiddle()
    }
    private submit: (value: modalResult) => void
    public sizeUp(): void {
        this.parent.classList.add(S.max)
        this.parent.innerHTML = this.big
        document.getElementsByClassName(S.back)[0].addEventListener("click", this.reset.bind(this))
        let value: number = 0
        const fir_number = document.getElementsByClassName(S.fir_number)[0]
        const fir_range = document.getElementsByClassName(S.fir_range)[0]
        const onChange = (e: any) => {
            value = e.target.value
            //@ts-ignore
            fir_number.value = value; fir_range.value = value;
        }
        onChange({target: {value: 2}})
        fir_number.addEventListener('input', onChange.bind(this))
        fir_range.addEventListener('input', onChange.bind(this))
        document.getElementsByClassName(S.fir_submit)[0].addEventListener('click', () => {this.submit({mode: "realtime", value: +value})})
    }
}