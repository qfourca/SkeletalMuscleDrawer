import App from "../../app/app";
import Component from "../package/component";
import Analysis from "./analysis";
import Functions from "./functions";
import S from './style.scss'
import Time from "./time";
export default class Bottom extends Component {
    protected html: string = `
        <div class="${S.bottomContainer}">

        </div>
    `
    constructor (
        app: App,
        parent: HTMLElement
    ) {
        super(app, parent)
        this.render()
        const container = this.getAsClassName(S.bottomContainer)
        new Time(app, container)
        new Functions(app, container)
        new Analysis(app, container)
    }
}