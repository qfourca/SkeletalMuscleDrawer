import * as THREE from 'three'
import Posture from "./posture"
export default class Animation extends Array<Moment> {
    constructor(
        startValue?: any
    ) {
        super()
        if(startValue == undefined) {}
        else if(startValue.timeLine != undefined) {
            this.setValue(startValue.timeLine)
        }
        else if(startValue[0].postures[0].rotation.x == undefined) {
            this.setValue(startValue)
        }
    }
    public setValue(value: any) {
        value.forEach((line: Moment) => {
            const postures:Array<Posture> = new Array()
            line.postures.forEach((element: any) => {
                postures.push(
                    new Posture(element.name,
                         new THREE.Euler(element.rotation._x, 
                                   element.rotation._y, 
                                   element.rotation._z,
                                   element.rotation._order)))
            })
            this.push({ postures, time: line.time })
        })
        
    }
    public clonePush(posture: Array<Posture>, time: number) {
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
        if(deepClonedArray.length != 0) this.push({ postures: deepClonedArray, time: time })
    }
    public download() {
        const element = document.createElement('a')
        element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this))
        element.setAttribute('download', "animation.json")
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }
    public getRootPosture(name: string, idx?: number): Posture {
        for(let i = idx == undefined ? this.length - 1 : idx; i >= 0; i--) {
            const res = this[i].postures.find((element) => element.name === name)
            if(res != undefined) return res
        }
        return new Posture('unExist', new THREE.Euler())
    }
}

export interface Moment {
    postures: Array<Posture>
    time: number
}