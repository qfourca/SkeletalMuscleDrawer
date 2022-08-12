import * as THREE from 'three'
import Posture from '../posture'
import Animation, { Moment } from '../animation'
import { Skeleton } from '../human'
import { Euler } from 'three'
export default class Animator {
    private skeleton = new Skeleton()
    public performanceTime: number = -1
    public maximumTime: number = -1
    public currentTime: number = -1
    public isRunning: boolean = false
    private animation: Animation
    constructor(
        animation: Animation
    ) {
        this.animation = animation
    }
    public animate(skeleton: Skeleton) {
        this.skeleton = skeleton
        this.maximumTime = this.getTime(this.animation.length - 1).reservation + this.getTime(this.animation.length - 1).run
        this.currentTime = 0
        this.isRunning = true
    }
    public update() {
        const now = performance.now() - this.performanceTime
        this.performanceTime = performance.now()
        if(this.isRunning) {
            this.currentTime += now
            if(this.currentTime > this.maximumTime) {
                this.currentTime = this.maximumTime
                this.isRunning = false
            }
            this.getTimeState(this.currentTime).forEach(element => {
                this.skeleton.getBone(element.name)!.rotation.set(element.rotation.x, element.rotation.y, element.rotation.z)
            })
        }
    }
    private getTime(idx: number): any {
        let reservation = 0
        for(let i = 0; i < idx; i++) {
            reservation += this.animation[i].time
        }
        let run = this.animation[idx].time
        return { 
            reservation,
            run
        }
    }
    private getTimeState(time: number):Array<Posture> {
        let currnetTime: number = time
        let beforeTime: number = 0
        let duration: number
        let idx: number
        for(idx = 0; time > 0; idx++) { 
            beforeTime += this.animation[idx].time 
            time -= this.animation[idx].time 
        }
        idx--
        duration = this.animation[idx].time
        beforeTime -= duration
        currnetTime -= beforeTime
        if(idx == 0) { return this.animation[0].postures }
        else {
            const delta = currnetTime / duration
            const result:Array<Posture> = new Array()
            this.animation[idx].postures.forEach((element) => {
                const root = this.getRootPosture(element.name, idx - 1)
                result.push({
                    name: element.name,
                    rotation: new Euler(
                        root.rotation.x + (element.rotation.x - root.rotation.x) * delta,
                        root.rotation.y + (element.rotation.y - root.rotation.y) * delta,
                        root.rotation.z + (element.rotation.z - root.rotation.z) * delta
                    )
                })
            })
            return result
        }
    }
    public getRootPosture(name: string, idx?: number): Posture {
        for(let i = idx == undefined ? this.animation.length - 1 : idx; i >= 0; i--) {
            const res = this.animation[i].postures.find((element) => element.name === name)
            if(res != undefined) return res
        }
        return new Posture('unExist', new THREE.Euler())
    }
    public movements(idx: number): Array<Posture> {
        const result = new Array()
        this.animation[idx].postures.forEach(element => {
            const root = this.getRootPosture(element.name, idx - 1)   
            result.push(new Posture(element.name, new THREE.Euler(
                element.rotation.x - root.rotation.x,
                element.rotation.y - root.rotation.y,
                element.rotation.z - root.rotation.z
            )))
        })
        return result
    }
}

export interface BoneMove {
    name: string
    move: THREE.Euler
    taken: number
    reservation: number
}