import * as THREE from 'three'
import UI from "./ui";
import App from "../app";
import Posture from "../posture";
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
                { func: () => { this.timeLine.push(this.app.human.posture!) }, expression: "timeline" },
                { func: () => { this.timeLine.download() }, expression: "download" }
            ]
        )
        const timer = setInterval(() => {
            if(!this.app.human.isLoading()) {
                this.debugUI.setBoneSelector(this.app.human.selectBone.bind(this.app.human))
                this.debugUI.setOptions(this.app.human.getBones())
                clearInterval(timer)
            }
        }, 10)
    }

    public update() {

    }
}