import Component from "../interface/component";

//@ts-ignore
import S from './style.scss'
export default class AnalysisUI extends Component {
    protected html: string = `
        <div class="${S.AnalysisContainer}">
            <video class="videoclass"></video>
            <div class="${S.result}">
                0 / 0
            </div>
        <div>
    `
    constructor (
        parent: Element
    ) {
        super(parent)
        this.render()
    }
    public setValue(current: number, goal: number) {
        this.getAsClassName(S.result).innerHTML = goal === Infinity ? String(current) : `${current} / ${goal}`
    }
    public getVideo(): HTMLVideoElement {
        //@ts-ignore
        return this.getAsClassName("videoclass")
    }

}