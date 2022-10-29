import App from "../../app/app";
import S from './style.scss'
import Component from "../package/component";
import { AnalysisSetting, AnalysisData } from "../../analysis";
import { Webcam } from "../../util";
import tempVideo from '../../../static/video/oneStar.mp4'
import { exerciseResult } from "../../analysis/analysis/index";
import { AnalysisResult } from "../../analysis/analysis";

export default class Moment extends Component {
    private index: number
    private canvas: HTMLCanvasElement
    constructor (
        app: App,
        parent: HTMLElement,
        data: {
            motion: AnalysisResult,
            exercise: exerciseResult
        },
        key: number
    ) {
        super(app, parent)
        this.index = key
        this.render(`
            <div class="${this.myClassName()}">
                <div class="${S.dataContainer}">
                    ${Math.round(data.exercise.score * 10) / 10}
                </div>
            </div>
        `)
        this.canvas = document.createElement('canvas')
        const ctx = this.canvas.getContext('2d')
        ctx!.drawImage(data.motion.image, 0, 0, 300, 150)
        this.getAsClassName(this.myClassName()).appendChild(this.canvas)
        this.getAsClassName(this.myClassName()).style.transform = `translateX(${-2000}%)`
        this.canvas.addEventListener('mouseenter', this.onMouseEnter.bind(this))
        this.canvas.addEventListener('mouseleave', this.onMouseLeave.bind(this))
        setTimeout(() => {
            this.getAsClassName(this.myClassName()).style.transform = ""
            setTimeout(() => this.getAsClassName(this.myClassName()).style.transition = "200ms", 1000) 
        }, 10)
    }
    private onMouseEnter() {
        this.getAsClassName(this.myClassName()).classList.add(S.enter)
    }
    private onMouseLeave() {
        this.getAsClassName(this.myClassName()).classList.remove(S.enter)
    }
    private myClassName(): string {
        return `${S.moment} ${this.index}`
    }
}