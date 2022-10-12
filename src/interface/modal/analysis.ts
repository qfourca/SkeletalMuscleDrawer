import Core from "../../core";
import Hook from "../../hook";
import Modal from "./modal";
import modal, { ModalMember } from "./modal";
//@ts-ignore
import webcamIcon from '../../static/image/webcam.png'
//@ts-ignore
import videoIcon from '../../static/image/video.png'
//@ts-ignore
import S from './style.scss'
export default class Analysis extends ModalMember {
    protected modal: modal;
    private ignore: boolean = false
    private clicked: Hook<number> = new Hook(0)
    public onModalClick: () => void = () => {
        if(this.ignore) {
            this.ignore = false
        }
        else if(confirm("정말 취소하시겠습니까?")) {
            this.modal.hide()
            Core.core.analysis.set({
                mode: "default",
                data: {}
            })
        }
    }
    private leftMiddle = `
        <img src=${webcamIcon}></img>
        실시간 분석
    `
    private rightMiddle = `
        <img src=${videoIcon}></img>
        동영상 분석
    `
    protected html: string = `
        <div class="${S.analysisContainer}">
            <div class="${S.leftOption}">
                ${this.leftMiddle}
            </div>
            <div class="${S.rightOption}">
                ${this.rightMiddle}
            </div>
        </div>
    `;
    private leftELement: Element
    private rightElement: Element
    private leftMax = `
        <button class="${S.back}">뒤로</button>
        <input class="${S.fir_number}" type="number" value="5"></input>
        <input class="${S.fir_range}" type="range" value="5" max="100" min="1"></input>
        <button class="${S.fir_submit}">sumbit</button>
    `
    private rightMax = `
        <button class="${S.back}">뒤로</button>
        <div class="${S.videoInput}">
            <input class="${S.uploadName}" value="첨부파일" placeholder="첨부파일">
            <label for="file">파일찾기</label> 
            <input type="file" id="file" accept="video/*">
        </div>
        <button class="${S.sec_submit}">sumbit</button>
    `
    constructor(
        modal: Modal
    ) {
        super(modal.modalBox)
        this.modal = modal
        this.render()
        this.leftELement = this.getAsClassName(S.leftOption)
        this.rightElement = this.getAsClassName(S.rightOption)
        this.leftELement.addEventListener('click', this.onLeftClick.bind(this))
        this.rightElement.addEventListener('click', this.onRightClick.bind(this))
        this.clicked.hang(this.hangClicked.bind(this))
    }
    private onLeftClick() {
        if(!this.ignore) {
            this.ignore = true
            this.clicked.set(-1)
        }
    }
    private onRightClick() {
        if(!this.ignore) {
            this.ignore = true
            this.clicked.set(1)
        }
    }
    private hangClicked(state: number) {
        if(state === -1) {
            this.leftELement.classList.add(S.maxmize)
            this.leftELement.innerHTML = this.leftMax
            this.rightElement.classList.add(S.minmize)
            this.rightElement.innerHTML = ''
            this.getAsClassName(S.back).addEventListener('click', () => { this.clicked.set(0); this.ignore = true })
            this.getAsClassName(S.fir_number).addEventListener('click', () => { 
                this.ignore = true 
            })
            this.getAsClassName(S.fir_range).addEventListener('click', () => { 
                this.ignore = true 
            })
            const set = (value: number) => {
                //@ts-ignore
                this.getAsClassName(S.fir_number).value = value; this.getAsClassName(S.fir_submit).value = value
            }
            this.getAsClassName(S.fir_number).addEventListener('input', () => { 
                //@ts-ignore
                set(this.getAsClassName(S.fir_number).value)
            })
            this.getAsClassName(S.fir_range).addEventListener('input', () => { 
                //@ts-ignore
                set(this.getAsClassName(S.fir_range).value)
            })
            this.getAsClassName(S.fir_submit).addEventListener('click', () => { 
                this.ignore = true
                Core.core.analysis.set({
                    mode: "analysis",
                    data: {
                        video: "$webcam",
                        //@ts-ignore
                        goal: +this.getAsClassName(S.fir_range).value,
                        count: 0,
                        points: 0
                    }
                })
                this.modal.hide()
            })
        }
        else if(state === 0) {
            this.leftELement.classList.remove(S.maxmize)
            this.rightElement.classList.remove(S.maxmize)
            this.leftELement.classList.remove(S.minmize)
            this.rightElement.classList.remove(S.minmize)
            this.leftELement.innerHTML = this.leftMiddle
            this.rightElement.innerHTML = this.rightMiddle
        }
        else {
            this.leftELement.classList.add(S.minmize)
            this.leftELement.innerHTML = ''
            this.rightElement.classList.add(S.maxmize)
            this.rightElement.innerHTML = this.rightMax
            this.getAsClassName(S.back).addEventListener('click', () => { this.clicked.set(0); this.ignore = true })
        }
    }
}

