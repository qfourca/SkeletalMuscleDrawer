import * as THREE from 'three'
import UI from "./ui";
import App from "../app";
import Posture from "../posture";


export default class Debug {
    private parent: HTMLElement
    private timeLine: Array<Array<Posture>> = new Array()
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
                { func: this.addTimeLine.bind(this) , expression: "timeline" },
                { func: () => { console.log(this.timeLine) }, expression: "download" }
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
    private addTimeLine() {
        const posture = this.app.human.posture!
        if(this.timeLine.length == 0) {
            const newArr = new Array()
            posture.forEach((element) => {
                newArr.push(new Posture(element.name, new THREE.Euler(element.rotation.x, element.rotation.y, element.rotation.z)))
            })
            this.timeLine.push(newArr)
        }
        else {
            const newArr = new Array()
            posture.forEach(element => {
                if(!Posture.compare(element, this.findRootPosture(element.name))) {
                    newArr.push(new Posture(element.name, new THREE.Euler(element.rotation.x, element.rotation.y, element.rotation.z)))
                }
            })
            this.timeLine.push(newArr)
        }
    }
    private findRootPosture(name: string): Posture {
        for(let i = this.timeLine.length - 1; i >= 0; i--) {
            const res = this.timeLine[i].find((element) => element.name === name)
            if(res != undefined) return res!
        }
        console.log("Error")
        return  {
            name: 'unknown',
            rotation: new THREE.Euler()
        }
    }


    public update() {

    }
    
}