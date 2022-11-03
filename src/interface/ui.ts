import App from "../app/app";
import S from './style.scss'
import Component from "./package/component";
import Timeline from "./timeline/timeline";
import Modal from "./modal/modal";
import AnalysisUI from "./analysis/analysis";
import Controller from "./controller";

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
        this.app.controllerElement.set(this.getAsClassName(S.memberContainer))
        const container = this.getAsClassName(S.memberContainer)
        new Controller(this.app, container)
        new AnalysisUI(this.app, container)
        new Modal(this.app, container)
        new Timeline(this.app, container)
    }
}