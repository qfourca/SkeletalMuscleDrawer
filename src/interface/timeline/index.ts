import UIRoot from "..";
import Core from "../../core";
import Component from "../interface/component";
import Analysis from "../modal/analysis";
import Functions from './functions'
//@ts-ignore
import S from './style.scss'
export default class TimeLine extends Component {
    protected html: string = `
        <div class="${S.TimeLine}">
            <div class="${S.SubtitleContainer}">
                <div class="${S.Subtitle}">
                </div>
            </div>
            <div class="${S.ProgressBarContainer}">
                <div class="${S.ProgressBar}">
                    <div class="${S.ProgressBall}"></div>
                </div>
            </div>
            <div class="${S.FunctionContainer}">
                <div class="${S.TimeProgress}">
                    <h2 class="${"time"}">00 : 00 / 00 : 00</h2>
                </div>
                <div class="${S.Functions}"></div>
                <div class="${S.ModeButtonContainer}">
                    <button class="${S.ModeButton}">분석하기</button>
                </div>
            </div>
        <div>
    `
    constructor (
        parent: Element
    ) {
        super(parent)
        this.render()
        new Functions(this.getAsClassName(S.Functions))
        Core.core.currentTime.hang(this.onTimeCnahge.bind(this))
        Core.core.analysis.hang(this.onModeChange.bind(this))
        Core.core.subtitle.hang(this.onSubtitleChange.bind(this))
        //@ts-ignore
        this.getAsClassName(S.ProgressBarContainer).addEventListener('click', this.setTime.bind(this))
        //@ts-ignore
        this.getAsClassName(S.ModeButton).addEventListener('click', this.setMode.bind(this))
    }
    private onTimeCnahge(time: number) {
        //@ts-ignore
        this.getAsClassName(S.ProgressBar).style.width = (time / Core.core.maximumTime.get()) * 100 + '%'
        //@ts-ignore
        this.getAsClassName("time").innerText = `${TimeLine.timeChange(Core.core.currentTime.get())} / ${TimeLine.timeChange(Core.core.maximumTime.get())}`
    }
    private onModeChange(mode: any) {
        const element = this.getAsClassName(S.ModeButton)
        if(mode.mode === "default") {
            element.innerHTML = "분석하기"
        }
        else if(mode.mode == "analysis") {
            element.innerHTML = "분석중..."
        }
    }
    private onSubtitleChange(content: string) {
        this.getAsClassName(S.Subtitle).innerHTML = content
    }
    private setTime(e: MouseEvent) {
        Core.core.currentTime.set(
            Core.core.maximumTime.get() 
            * e.clientX / +window.getComputedStyle(this.getAsClassName(S.ProgressBarContainer)).width.replace("px", ""))
    }
    private setMode() {
        Core.core.analysis.set({
            mode: "analysis",
            data: null
        })
        UIRoot.Root.appendModal(new Analysis(UIRoot.Root.getModal()))
    }
    private static timeChange(ms: number): string {
        const seconds = ms / 1000
        let min:string = String(Math.round((seconds%3600) / 60))
        min = (Number(min) < 10 ? "0" : "") + min
        let sec:string = String(Math.round(seconds%60))
        sec = (Number(sec) < 10 ? "0" : "") + sec
        return `${min} : ${sec}`
    }
}