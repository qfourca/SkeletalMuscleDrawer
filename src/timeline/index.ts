import * as THREE from 'three'
import Posture from "../posture"

export default class TimeLine {
    private timeLine:Array<Array<Posture>>
    constructor(
        startValue?: Array<Array<Posture>>
    ) {
        if(startValue == undefined) this.timeLine = new Array()
        else if(startValue[0][0].rotation.x == undefined) {
            let timeLine:Array<Array<Posture>> = new Array()
            startValue.forEach((line: Array<any>, i: number) => {
                let one:Array<Posture> = new Array()
                line.forEach((element ,j) => {
                    one.push(
                        new Posture(element.name,
                             new THREE.Euler(element.rotation._x, 
                                       element.rotation._y, 
                                       element.rotation._z, 
                                       element.rotation._order)))
                })
                timeLine.push(one)
                one = new Array()
            })
            this.timeLine = timeLine
        }
        else {
            this.timeLine = startValue
        }
    }
    public push(posture: Array<Posture>) {
        const deepClonedArray = new Array()
        posture.forEach(element => {
            if(!Posture.compare(element, this.getRootPosture(element.name))) {
                deepClonedArray.push(new Posture(element.name, new THREE.Euler(element.rotation.x, element.rotation.y, element.rotation.z)))
            }
        })
        if(deepClonedArray.length != 0) this.timeLine.push(deepClonedArray)
    }
    public download() {
        const element = document.createElement('a')
        element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this))
        element.setAttribute('download', "animation.json")
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }
    public getTimeLine() {
        return this.timeLine
    }
    public movements(idx: number):Array<Posture> {
        const result = new Array()
        this.timeLine[idx].forEach(element => {
            
            const root = this.getRootPosture(element.name, idx - 1)   
            if(element.name == 'left-top-arm') {
                console.log(root, element)
            }         
            result.push(new Posture(element.name, new THREE.Euler(
                element.rotation.x - root.rotation.x,
                element.rotation.y - root.rotation.y,
                element.rotation.z - root.rotation.z
            )))
        })
        return result
    }
    private getRootPosture(name: string, idx?: number): Posture {
        for(let i = idx == undefined ? this.timeLine.length - 1 : idx; i >= 0; i--) {
            const res = this.timeLine[i].find((element) => element.name === name)
            if(res != undefined) return res
        }
        return new Posture('unExist', new THREE.Euler())
    }
    
}