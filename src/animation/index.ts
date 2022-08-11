import * as THREE from 'three'
import Posture from "../posture"

export default class Animation {
    private timeLine:Array<moment>
    constructor(
        startValue?: Array<moment>
    ) {
        if(startValue == undefined) this.timeLine = new Array()
        else if(startValue[0].postures[0].rotation.x == undefined) {
            let timeLine:Array<moment> = new Array()
            startValue.forEach((line: moment, i: number) => {
                let one:moment = { postures: new Array(), time: line.time}
                line.postures.forEach((element ,j) => {
                    one.postures.push(
                        new Posture(element.name,
                            //@ts-ignore
                             new THREE.Euler(element.rotation._x, 
                            //@ts-ignore
                                       element.rotation._y, 
                            //@ts-ignore
                                       element.rotation._z,
                            //@ts-ignore 
                                       element.rotation._order)))
                })
                timeLine.push(one)
                one = { postures: new Array(), time: 0}
            })
            this.timeLine = timeLine
        }
        else {
            this.timeLine = startValue
        }
    }
    public push(posture: Array<Posture>, time: number) {
        const deepClonedArray = new Array()
        posture.forEach(element => {
            if(!Posture.compare(element, this.getRootPosture(element.name))) {
                deepClonedArray.push(
                    new Posture(element.name, 
                        new THREE.Euler(
                            element.rotation.x, 
                            element.rotation.y, 
                            element.rotation.z)))
            }
        })
        if(deepClonedArray.length != 0) this.timeLine.push({ postures: deepClonedArray, time: time })
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
        this.timeLine[idx].postures.forEach(element => {
            const root = this.getRootPosture(element.name, idx - 1)   
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
            const res = this.timeLine[i].postures.find((element) => element.name === name)
            if(res != undefined) return res
        }
        return new Posture('unExist', new THREE.Euler())
    }
    public getTime(idx: number): any {
        let reservation = 0
        for(let i = 0; i < idx; i++) {
            reservation += this.timeLine[i].time
        }
        let run = this.timeLine[idx].time
        return { 
            reservation,
            run
        }
    }
}

export interface moment {
    postures: Array<Posture>
    time: number
}