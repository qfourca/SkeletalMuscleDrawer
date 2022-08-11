import * as THREE from 'three'
import { Skeleton } from '../human'
import Posture from "../posture"
import Animator from './animator'
export default class Animation extends Array<Moment> {
    private animator: Animator = new Animator()
    constructor(
        startValue?: Array<Moment>
    ) {
        super()
        if(startValue == undefined) {}
        else if(startValue[0].postures[0].rotation.x == undefined) {
            this.setValue(startValue)
        }
    }
    public setValue(value: any) {
        value.forEach((line: Moment, i: number) => {
            const postures:Array<Posture> = new Array()
            line.postures.forEach((element: any ,j: number) => {
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
    public movements(idx: number): Array<Posture> {
        const result = new Array()
        this[idx].postures.forEach(element => {
            const root = this.getRootPosture(element.name, idx - 1)   
            result.push(new Posture(element.name, new THREE.Euler(
                element.rotation.x - root.rotation.x,
                element.rotation.y - root.rotation.y,
                element.rotation.z - root.rotation.z
            )))
        })
        return result
    }
    public getTime(idx: number): any {
        let reservation = 0
        for(let i = 0; i < idx; i++) {
            reservation += this[i].time
        }
        let run = this[idx].time
        return { 
            reservation,
            run
        }
    }
    private getRootPosture(name: string, idx?: number): Posture {
        for(let i = idx == undefined ? this.length - 1 : idx; i >= 0; i--) {
            const res = this[i].postures.find((element) => element.name === name)
            if(res != undefined) return res
        }
        return new Posture('unExist', new THREE.Euler())
    }

    public animate(skeleton: Skeleton) {
        this.animator.animate(this, skeleton)
    }
    public update() {
        this.animator.update()
    }
}

export interface Moment {
    postures: Array<Posture>
    time: number
}