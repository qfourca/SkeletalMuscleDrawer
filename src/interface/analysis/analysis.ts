import App from "../../app/app";
import S from './style.scss'
import Component from "../package/component";
import { AnalysisSetting, AnalysisData } from "../../analysis";
import { Webcam } from "../../util";
import tempVideo from '../../../static/video/oneStar.mp4'
import badVideo from '../../../static/video/bad.mp4'
import Moment from "./moment";

export default class AnalysisUI extends Component {
    private moments: Array<Moment> = new Array()
    protected html: string = `
        <div class="${S.analysisContainer} ${S.containerHide}">
            <div class="${S.infoContainer}">
                <video class="${S.videoClass}"></video>
                <div class="${S.bufferContainer}"></div>
            </div>
            <div class="${S.momentContainer}">
            </div>
        </div>
    `
    constructor (
        app: App,
        parent: HTMLElement,
    ) {
        super(app, parent)
        this.render()
        this.setVideoElement()
        
        this.app.analysisSetting.hang(this.onAnalysisChange.bind(this))
        this.app.analysisData.hang(this.onAnalysisDataChange.bind(this))
    }
    private onAnalysisChange(info: AnalysisSetting) {
        if(info.isWorking) { 
            this.getAsClassName(S.analysisContainer).classList.remove(S.containerHide) 
            if(info.videoSrc === "") {}
            else if(info.videoSrc === "$webcam") {
                const webcam = new Webcam(info.videoElement, tempVideo)
            }
            else {
                this.getVideoElement().src = info.videoSrc
            }
        
        }
        else { this.getAsClassName(S.analysisContainer).classList.add(S.containerHide) }
    }
    private onAnalysisDataChange(data: AnalysisData) {
        let innerHTML = ""
        data.buffer.poseAngles.forEach((value) => {
            innerHTML += `<h6>${value.name} : ${AnalysisUI.RadinToDegree(value.value)}</h6>`
        })
        this.getAsClassName(S.bufferContainer).innerHTML = innerHTML
        if(data.history.length > this.moments.length) {
            this.moments.push(
                new Moment(
                    this.app, 
                    this.getAsClassName(S.momentContainer),
                    data.history.at(data.history.length - 1)!,
                    data.history.length - 1))
        }
    }
    private static RadinToDegree(radian: number): number {
        return Math.round((radian * 180 / Math.PI) * 10) / 10
    }
    private setVideoElement() {
        const temp = {...this.app.analysisSetting.get()}
        temp.videoElement = this.getVideoElement()
        this.app.analysisSetting.set(temp)
    }
    private getVideoElement(): HTMLVideoElement {
        //@ts-ignore
        return this.getAsClassName(S.videoClass)
    }
}