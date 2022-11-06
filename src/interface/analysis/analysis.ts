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
                <div class="${S.bufferContainer}">
                    <table class="${S.table}">

                    </table>
                </div>
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
            const video = this.getVideoElement()
            video.autoplay = true
            video.muted = true
            video.playsInline = true
            video.controls = true
            if(info.videoSrc === "") {
                video.srcObject = null
                video.src = ""
            }
            else if(info.videoSrc === "$webcam") {
                const webcam = new Webcam(info.videoElement)
            }
            else {
                video.src = info.videoSrc
            }
        }
        else { this.getAsClassName(S.analysisContainer).classList.add(S.containerHide) }
    }
    private onAnalysisDataChange(data: AnalysisData) {
        this.getAsClassName(S.table).innerHTML = data.buffer.poseAngles.toTable()
        if(data.history.length === 0) {
            this.moments.forEach((element) => {
                element.destructor()
            })
            this.moments = new Array()
        }
        else if(data.history.length > this.moments.length) {
            this.moments.push(
                new Moment(
                    this.app, 
                    this.getAsClassName(S.momentContainer),
                    data.history.at(data.history.length - 1)!,
                    data.history.length - 1))
        }
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