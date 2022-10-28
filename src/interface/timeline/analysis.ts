import App from "../../app/app";
import Component from "../package/component";
import Functions from "./functions";
import S from './style.scss'
export default class Analysis extends Component {
    protected html: string = `
        <div class="${S.analysisContainer}">
        </div>
    `
    constructor (
        app: App,
        parent: HTMLElement
    ) {
        super(app, parent)
        this.render()
    }
}