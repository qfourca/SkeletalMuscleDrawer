import UI from "./ui";
import App from "../app";
import Bone from "./bone";

export default class Debug {
    private parent: HTMLElement
    private app: App
    private debugUI: UI
    private debugBone?: Bone
    constructor(
        app: App
    ) {
        this.parent = app.parent
        this.app = app
        this.debugUI = new UI(this.parent, 
            [
                { func: () => { console.log(JSON.stringify(this.app.human.posture)) }, expression: "posture" } 
            ])
        let timer = setInterval(() => {
            if(!this.app.human.isLoading()) {
                this.debugBone = new Bone(this.app.scene, this.app.human.bones)
                this.debugUI.setBoneSelector(this.debugBone.selectBone.bind(this.debugBone))
                clearInterval(timer)
            }
        }, 10)
    }
    update() {

    }
    
}