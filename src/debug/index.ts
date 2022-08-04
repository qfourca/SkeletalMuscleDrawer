import UI from "./ui";
import App from "../app";

export default class Debug {
    private parent: HTMLElement
    private app: App
    private debugUI: UI
    constructor(
        app: App
    ) {
        this.parent = app.parent
        this.app = app
        this.debugUI = new UI(this.parent, 
            [
                { func: () => { console.log(JSON.stringify(this.app.human.posture)) }, expression: "posture" } 
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
    update() {

    }
    
}