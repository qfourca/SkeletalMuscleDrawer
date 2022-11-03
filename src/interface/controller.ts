import App from "../app/app"
import Component from "./package/component"
import S from './style.scss'
export default class Controller extends Component {
    protected html: string = `
        <div class="${S.controller}">
        </div>
    `
    constructor (
        app: App,
        parent: HTMLElement
    ) {
        super(app, parent)
        this.render()
        this.app.controllerElement.set(this.getAsClassName(S.controller))
    }
}