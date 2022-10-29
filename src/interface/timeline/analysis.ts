import App from "../../app/app";
import Component from "../package/component";
import S from './style.scss'
import { analysis, search } from './icons'
import { AnalysisSetting } from "../../analysis";
import analysisMode from "../modal/analysisMode";
export default class Analysis extends Component {
    protected html: string = `
        <div class="${S.analysisContainer}">
            <div class="${S.analysis}">
                <img src=${analysis}></img>
            </div>
        </div>
    `
    constructor (
        app: App,
        parent: HTMLElement
    ) {
        super(app, parent)
        this.render()
        this.getAsClassName(S.analysis).addEventListener('click', () => {
            const toggle = () => {
                const temp = { ...this.app.analysisSetting.get() }
                temp.isWorking = !temp.isWorking
                this.app.analysisSetting.set(temp)
            }
            if(this.app.analysisSetting.get().isWorking) {
                if(confirm("분석을 종료하시겠습니까?")) {
                    toggle()
                }
            }
            else {
                toggle()
                const temp = { ...this.app.modal.get() }
                temp.component = new analysisMode(app)
                this.app.modal.set(temp)
            }
        })
        this.app.analysisSetting.hang(this.onAnalysisChange.bind(this))
    }
    private onAnalysisChange(info: AnalysisSetting) {
        if(info.isWorking) {
            this.getImageELement().src = search
            this.getImageELement().className = S.doPingPong
        }
        else {
            this.getImageELement().src = analysis
            this.getImageELement().className = ""
        }
    }
    private getImageELement(): HTMLImageElement {
        //@ts-ignore
        return this.getAsClassName(S.analysis).children[0]
    }
}