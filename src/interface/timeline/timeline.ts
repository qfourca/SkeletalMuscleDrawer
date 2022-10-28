import App from "../../app/app";
import Component from "../package/component";
import Bar from "./bar";
import S from './style.scss'

export default class Timeline extends Component {
    protected html: string = `
        <div class="${S.timelineContainer}">
        </div>
    `
    constructor (
        app: App,
        parent: HTMLElement
    ) {
        super(app, parent)
        this.render()
        const container = this.getAsClassName(S.timelineContainer)
        new Bar(app, container)
    }
}