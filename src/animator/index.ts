import UI from "./ui";
import App from "../app";
import TimeLine from '../timeline';

export default class Debug {
    private parent: HTMLElement
    private timeLine: TimeLine = new TimeLine()
    private app: App
    private debugUI: UI
    constructor(
        app: App
    ) {
        this.parent = app.parent
        this.app = app
        this.debugUI = new UI(this.parent, 
            [
                { func: () => { console.log(this.timeLine) }, expression: "print" },
                { func: () => { this.timeLine.push(this.app.human.getPosture()) }, expression: "timeline" },
                { func: () => { this.timeLine.download() }, expression: "download" }
            ]
        )
        this.app.human.executeOnLoad(() => {
            this.debugUI.setBone(this.app.human.selectBone.bind(this.app.human))
            this.debugUI.setOptions(this.app.human.getBones())
        })
    }
    public update() {

    }
}