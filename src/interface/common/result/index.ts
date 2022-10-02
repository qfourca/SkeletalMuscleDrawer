import { InterfaceNode, InterfaceRoot } from '../types'
//@ts-ignore
import S from './style.scss'
export default class Result {
    private me: HTMLElement
    private parent: InterfaceRoot
    private isClick: boolean = false
    constructor (
        parent: InterfaceRoot,
    ) {
        this.parent = parent
        this.me = document.createElement('div')
        this.me.className = S.modal
        InterfaceNode.root.appendChild(this.me)
        this.me.innerHTML = `
            <div class=${S.container}>
                <div class=${S.main}>
                    <h1>결과</h1>
                    <div class=${S.resInfo}>
                        <h2>점수</h2>
                        <div></div>
                    </div>
                </div>
            </div>
            <div class=${S.bg}></div>
        `
        // this.hide()
        this.me.addEventListener("click", this.onClick.bind(this))
    }
    public hide() {
        this.me.classList.add(S.hide)
    }
    public expose() {
        this.me.classList.remove(S.hide)
    }
    private onClick() {
        if(this.isClick) { this.isClick = false }
        else {
            if (confirm("정말 취소하시겠습니까?") == true){
                this.hide()
            }
        }
    }
}