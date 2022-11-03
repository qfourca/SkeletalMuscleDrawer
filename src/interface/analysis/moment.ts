import App from "../../app/app";
import S from './style.scss'
import Component from "../package/component";
import { AnalysisSetting, AnalysisData } from "../../analysis";
import { exerciseResult } from "../../analysis/analysis/index";
import { AnalysisResult } from "../../analysis/analysis";
import Hook from "../../hook";

export default class Moment extends Component {
    private index: number
    private canvas: HTMLCanvasElement
    private isMouseEnter: Hook<boolean> = new Hook(false)
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
        let deductions = ""
        data.exercise.deductions.forEach(({deduction}) => {
            deductions += `<h6>> ${deduction}</h6>`
        })
        this.render(`
            <div class="${this.myClassName()}">
                <div class="${S.dataContainer}">
                    <div class="${S.score}">
                        ${Math.round(data.exercise.score * 10) / 10}
                    </div>
                    <div class="${S.additionalContainer}">
                        <h5>완벽해요!</h5>
                        <div class="${S.feedBackContainer}">
                            ${deductions}
                        </div>
                    </div>
                </div>
            </div>
        `)
        this.canvas = document.createElement('canvas')
        const ctx = this.canvas.getContext('2d')
        ctx!.drawImage(data.motion.image, 0, 0, 300, 150)

        const me = this.getAsClassName(this.myClassName())
        me.appendChild(this.canvas)
        me.style.transform = `translateX(${-2000}%)`
        this.canvas.addEventListener('mouseenter', () => this.isMouseEnter.set(true))
        this.canvas.addEventListener('mouseleave', () => this.isMouseEnter.set(false))
        me.getElementsByClassName(S.dataContainer)[0].addEventListener('mouseenter', () => this.isMouseEnter.set(true))
        me.getElementsByClassName(S.dataContainer)[0].addEventListener('mouseleave', () => this.isMouseEnter.set(false))
        this.isMouseEnter.hang(this.onMouseChange.bind(this))

        console.log(data.motion)

        setTimeout(() => {
            me.style.transform = ""
            setTimeout(() => me.style.transition = "200ms", 1000) 
        }, 10)
    }
    private onMouseChange(isEnter: boolean) {
        if(isEnter)
            this.getAsClassName(this.myClassName()).classList.add(S.enter)
        else
            this.getAsClassName(this.myClassName()).classList.remove(S.enter)
    }
    private myClassName(): string {
        return `${S.moment} ${this.index}`
    }
}