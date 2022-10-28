import App from "../../app/app";
import Component from "../package/component";
import S from './style.scss'
export default class Time extends Component {
    protected html: string = `
        <div class="${S.timeContainer}">
            <div class="${S.time}">
                00 : 00 / 00 : 00
            </div>
        </div>
    `
    constructor (
        app: App,
        parent: HTMLElement
    ) {
        super(app, parent)
        this.render()
        this.app.currentTime.hang(this.onTimeChange.bind(this))
    }
    private onTimeChange(currentTime: number) {
        const maximumTime = this.app.animation.get().duration
        this.getAsClassName(S.time).innerText = `${Time.timeChange(currentTime)} / ${Time.timeChange(maximumTime)}`
    }
    private static timeChange(ms: number): string {
        const seconds = ms / 1000
        let min:string = String(Math.round((seconds%3600) / 120))
        min = (Number(min) < 10 ? "0" : "") + min
        let sec:string = String(Math.round(seconds%60))
        sec = (Number(sec) < 10 ? "0" : "") + sec
        return `${min} : ${sec}`
    }
}