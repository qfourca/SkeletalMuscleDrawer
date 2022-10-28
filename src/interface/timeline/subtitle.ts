import App from "../../app/app";
import Component from "../package/component";
import Bar from "./bar";
import Bottom from "./bottom";
import S from './style.scss'

export default class Subtitle extends Component {
    protected html: string = `
        <div class="${S.subtitleContainer}">
        </div>
    `
    constructor (
        app: App,
        parent: HTMLElement
    ) {
        super(app, parent)
        this.render()
        this.app.subtitle.hang(this.onSubtitleChange.bind(this))
    }
    private onSubtitleChange(subtitle: string) {
        this.getAsClassName(S.subtitleContainer).innerText = subtitle
    }
}