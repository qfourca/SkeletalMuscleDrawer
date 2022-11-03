import App from "../../app/app";
import S from './style.scss'
import { ModalMember } from "./modal";
import webcamIcon from '../../../static/image/webcam.png'
import videoIcon from '../../../static/image/video.png'
import Hook from "../../hook";

export default class analysisMode extends ModalMember {
    private ignore: boolean = false
    private currentState: Hook<number> = new Hook(0)
    private isSelected: boolean = false
    private videoFile?: File
    protected html: string = `
        <div class="${S.analysisModeContainer}">
            <div class="${S.leftSelectBox}">
            </div>
            <div class="${S.rightSelectBox}">
            </div>
        </div>
    `
    private leftSelectBox: HTMLElement
    private rightSelectBox: HTMLElement
    private leftReadyHtml = `
        <img src="${webcamIcon}"></img>
        <h2>
            웹캠 분석
        </h2>
    `
    private rightReadyHtml = `
        <img src="${videoIcon}">
        </img>
        <h2>
            비디오 분석
        </h2>
    `
    private leftMaxHtml = `
        <div class="${S.maxContainer}">
            <button class="${S.back}">
                back
            </button>
            <input class="${S.value}" type="number" value="4"></input>
            <input class="${S.range}" type="range" min="1" max ="64" step="1" value="4"></input>
            <button class="${S.submit}">
                시작
            </button>
        </div>
    `
    private rightMaxHtml = `
        <div class="${S.maxContainer}">
            <button class="${S.back}">
                back
            </button>
            <div class="${S.filebox}">
                <input class="${S.uploadName}" value="파일선택" disabled="disabled">
                <label for="ex_filename">업로드</label> 
                <input type="file" id="ex_filename" class="${S.fileCore}"> 
            </div>
            <button class="${S.submit}">
                시작
            </button>
        </div>
    `
    constructor (
        app: App
    ) {
        super(app)
        this.render()

        this.leftSelectBox = this.getAsClassName(S.leftSelectBox)
        this.rightSelectBox = this.getAsClassName(S.rightSelectBox)

        this.currentState.hang(this.onStateChange.bind(this))
        this.getAsClassName(S.analysisModeContainer).addEventListener('click', this.onClickMe.bind(this))
        this.leftSelectBox.addEventListener('click', this.onLeftClick.bind(this))
        this.rightSelectBox.addEventListener('click', this.onRightClick.bind(this))
        this.currentState.set(0)
    }
    private onClickMe() {
        this.ignore = true
    }

    private onStateChange(state: number) {
        if(state === 0) {
            this.leftSelectBox.innerHTML = this.leftReadyHtml
            this.rightSelectBox.innerHTML = this.rightReadyHtml
            this.leftRemoveAndAdd(S.ready)
            this.rightRemoveAndAdd(S.ready)
        }
        else if(state === -1) {
            this.leftSelectBox.innerHTML = this.leftMaxHtml
            this.rightSelectBox.innerHTML = ""
            this.leftRemoveAndAdd(S.max)
            this.rightRemoveAndAdd(S.min)
            this.getAsClassName(S.back).addEventListener('click', this.onBackClick.bind(this))
            this.getAsClassName(S.range).addEventListener('input', this.onLeftInput.bind(this))
            this.getAsClassName(S.value).addEventListener('input', this.onLeftInput.bind(this))
            this.getAsClassName(S.submit).addEventListener('click', this.onLeftSubmit.bind(this))
        }
        else if(state === 1) {
            this.leftSelectBox.innerHTML = ""
            this.rightSelectBox.innerHTML = this.rightMaxHtml
            this.getAsClassName(S.back).addEventListener('click', this.onBackClick.bind(this))
            this.getAsClassName(S.fileCore).addEventListener('input', this.onRightInput.bind(this))
            this.getAsClassName(S.submit).addEventListener('click', this.onRightSubmit.bind(this))
            this.leftRemoveAndAdd(S.min)
            this.rightRemoveAndAdd(S.max)
        }
    }
    private onLeftInput(e: Event) {
        //@ts-ignore
        const value = +e.target.value
        //@ts-ignore
        this.getAsClassName(S.range).value = value
        //@ts-ignore
        this.getAsClassName(S.value).value = value
    }
    private onLeftSubmit() {
        const temp = { ...this.app.analysisSetting.get() }
        temp.isWorking = true
        temp.videoSrc = "$webcam"
        this.app.analysisSetting.set(temp)
        const tempValue = { ...this.app.analysisData.get() }
        //@ts-ignore
        tempValue.goal = +this.getAsClassName(S.value).value
        this.app.analysisData.set(tempValue)
        const modal = { ...this.app.modal.get() }
        modal.component = undefined
        this.destructor()
        this.app.modal.set(modal)
    }
    private leftRemoveAndAdd(name: string) {
        this.leftSelectBox.classList.remove(S.ready)
        this.leftSelectBox.classList.remove(S.max)
        this.leftSelectBox.classList.remove(S.min)
        this.leftSelectBox.classList.add(name)
    }
    private rightRemoveAndAdd(name: string) {
        this.rightSelectBox.classList.remove(S.ready)
        this.rightSelectBox.classList.remove(S.max)
        this.rightSelectBox.classList.remove(S.min)
        this.rightSelectBox.classList.add(name)
    }
    private onLeftClick() {
        if(!this.isSelected) {
            this.currentState.set(-1)
            this.isSelected = true
        }
    }
    private onRightClick() {
        if(!this.isSelected) {
            this.currentState.set(1)
            this.isSelected = true
        }
    }
    private onBackClick() {
        this.currentState.set(0)
        setTimeout(() => this.isSelected = false, 10)
    }
    private onRightInput(e: any) {
        //@ts-ignore
        this.getAsClassName(S.uploadName).value = e.target.files[0].name
        this.videoFile = e.target.files[0]
        // console.log(this.videoFile)
    }
    private onRightSubmit(e: any) {
        if(this.videoFile === undefined) {
            alert("파일이 존재하지 않습니다")
        }
        else {
            const temp = {...this.app.analysisSetting.get()}
            temp.videoSrc = URL.createObjectURL(this.videoFile)
            this.app.analysisSetting.set(temp)
            const modal = { ...this.app.modal.get() }
            modal.component = undefined
            this.destructor()
            this.app.modal.set(modal)
        }
    }
    public beforeDestroy(): boolean {
        if(this.ignore) { 
            this.ignore = false
            return false
        }
        const response = confirm("종료하시겠습니까?")
        if(response) {
            const temp = { ...this.app.analysisSetting.get() }
            temp.isWorking = false
            this.app.analysisSetting.set(temp)
        }
        return response
    }
}