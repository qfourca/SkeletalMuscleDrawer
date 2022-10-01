import { InterfaceNode, InterfaceRoot } from '../types'
import Realtime from './realtime'
//@ts-ignore
import S from './style.scss'
import Video from './video'
export default class Modal {
    private me: HTMLElement
    private parent: InterfaceRoot
    private isClick: boolean = false
    private fir:Element
    private sec: Element
    private realtime: Realtime
    private video: Video
    private setIgnore: boolean = false
    private poped: boolean = false
    constructor (
        root: HTMLElement,
        parent: InterfaceRoot
    ) {
        this.parent = parent
        this.me = document.createElement('div')
        this.me.className = S.modal
        root.appendChild(this.me)
        this.me.innerHTML = `
            <div class=${S.container}>
                <div class=${S.first}>
                    <h1>실시간 분석</h1>
                </div>
                <div class=${S.second}>
                    <h1>영상 분석</h1>
                </div>
            </div>
            <div class=${S.bg}></div>
        `
        this.hide()
        this.me.addEventListener('click', this.onClick.bind(this))
        this.fir = document.getElementsByClassName(S.first)[0]
        this.sec = document.getElementsByClassName(S.second)[0]
        this.fir.addEventListener('click', this.firClick.bind(this))
        this.sec.addEventListener('click', this.secClick.bind(this))
        this.realtime = new Realtime(this.fir, this.reset.bind(this))
        this.video = new Video(this.sec, this.reset.bind(this))
    }
    public hide() {
        this.me.classList.add(S.hide)
    }
    public expose(): InterfaceRoot {
        this.me.classList.remove(S.hide)
        return this.parent
    }
    private onClick() {
        if(this.isClick) {
            this.isClick = false
        }
        else {
            if (confirm("정말 취소하시겠습니까?") == true){
                this.hide()
            }
            else{
    
            }
        }
    }
    private firClick() {
        this.isClick = true
        if(!this.setIgnore && !this.poped) {
            this.realtime.sizeUp()
            this.video.sizeDown()
            this.poped = true
        }
        else {
            this.setIgnore = false
        }
    }
    private secClick() {
        this.isClick = true
        if(!this.setIgnore && !this.poped) {
            this.realtime.sizeDown()
            this.video.sizeUp()
            this.poped = true
        }
        else {
            this.setIgnore = false
        }
    }
    private reset() {
        this.realtime.sizeMiddle()
        this.video.sizeMiddle()
        this.setIgnore = true
        this.poped = false
    }
}