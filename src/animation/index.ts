import * as THREE from 'three'
import { Skeleton } from '../human'
import Posture from "../posture"
import Animator from './animator'
export default class Animation extends Array<Moment> {
    private animator: Animator = new Animator(this)
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
            if(!Posture.compare(element, this.animator.getRootPosture(element.name))) {
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
    public animate(skeleton: Skeleton) {
        this.animator.animate(skeleton)
    }
    public getCurrentTime():number  {
        return this.animator.currentTime
    }
    public getMaximumTime() {
        return this.animator.maximumTime
    }
    public update() {
        this.animator.update()
    }
}

export interface Moment {
    postures: Array<Posture>
    time: number
}