import App from "../app/app";
import S from './style.scss'
import Component from "./package/component";
import Timeline from "./timeline/timeline";

export default class UI extends Component {
    protected html: string = `
        <div class="${S.uiRoot}">
            <div class="${S.memberContainer}">
            </div>
        </div>
    `
    constructor (
        app: App
    ) {
        super(app, app.rootElement.get())
        this.render()
        const container = this.getAsClassName(S.memberContainer)
        new Timeline(this.app, container)
    }
}