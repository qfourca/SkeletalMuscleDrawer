import App from "../../app/app";
import S from './style.scss'
import Component from "../package/component";
import { AnalysisInfo } from "../../analysis";
import { Webcam } from "../../util";
import tempVideo from '../../../static/video/oneStar.mp4'

export default class AnalysisUI extends Component {
    protected html: string = `
        <div class="${S.analysisContainer} ${S.containerHide}">
            <div class="${S.infoContainer}">
                <video class="${S.videoClass}"></video>
                <div class="${S.bufferContainer}"></div>
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
        
        this.app.analysis.hang(this.onAnalysisChange.bind(this))
    }
    private onAnalysisChange(info: AnalysisInfo) {
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
        console.log(info)
    }
    private setVideoElement() {
        const temp = {...this.app.analysis.get()}
        temp.videoElement = this.getVideoElement()
        this.app.analysis.set(temp)
    }
    private getVideoElement(): HTMLVideoElement {
        //@ts-ignore
        return this.getAsClassName(S.videoClass)
    }
}