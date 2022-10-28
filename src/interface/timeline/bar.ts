import App from "../../app/app";
import Component from "../package/component";
import S from './style.scss'

export default class Bar extends Component {
    protected html: string = `
        <div class="${S.barMouseContainer}">
            <div class="${S.barContainer}">
                <div class="${S.bar}">
                    <div class="${S.ball}"></div>
                </div>
            </div>
        </div>
    `
    constructor (
        app: App,
        parent: HTMLElement
    ) {
        super(app, parent)
        this.render()
        this.getAsClassName(S.barMouseContainer).addEventListener('click', this.onBarClick.bind(this))
        app.currentTime.hang(this.onTimeChange.bind(this))
    }
    private onTimeChange(currentTime: number) {
        const maximumTime = this.app.animation.get().duration
        this.getAsClassName(S.bar).style.width = `${currentTime / maximumTime * 100}%`
    }
    private onBarClick(e: MouseEvent) {
        const maximumTime = this.app.animation.get().duration
        const clickX = e.clientX
        const barSize = +window.getComputedStyle(this.getAsClassName(S.barMouseContainer)).width.replace("px", "")
        this.app.currentTime.set(maximumTime * clickX / barSize)
    }
}