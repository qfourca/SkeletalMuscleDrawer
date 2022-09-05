import * as THREE from 'three'
import Posture from '../animation/posture'
import Animation, { Moment } from '../animation'
import { Skeleton } from '../human'
import { Euler } from 'three'
export default class Animator {
    private skeleton = new Skeleton()
    private animation: Animation = new Animation()
    public maximumTime: number = -1
    public currentTime: number = -1
    public isRunning: boolean = false
    public isLoaded: boolean = false
    constructor(

    ) {

    }
    public animate(animation: Animation, skeleton: Skeleton) {
        this.skeleton = skeleton
        this.animation = animation
        this.maximumTime = this.getTime(this.animation.length - 1).reservation + this.getTime(this.animation.length - 1).run
        this.currentTime = 0
        this.isLoaded = true
        this.isRunning = true
    }
    public update(interval: number) {
        if(this.isRunning) {
            this.currentTime += interval
            if(this.currentTime > this.maximumTime) {
                this.currentTime = this.maximumTime
                this.isRunning = false
            }
            else if(this.currentTime < 0) this.currentTime = 0
        }
        if(this.isLoaded) this.render() 
    }
    public render() {
        this.getTimeState(this.currentTime).forEach(element => {
            this.skeleton.getBone(element.name)!.rotation.set(element.rotation.x, element.rotation.y, element.rotation.z)
        })
    }
    public getTime(idx: number): any {
        // let reservation = 0
        // for(let i = 0; i < idx; i++) {
        //     reservation += this.animation[i].time
        // }
        let reservation = idx === 0 ? 0 : this.animation[idx - 1].time
        let run = this.animation[idx].time - reservation
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
        try {
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
                    const root = this.animation.getRootPosture(element.name, idx - 1)
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
        catch(e) {
            console.log("OUT OF BOUND TIME")
            return new Array()
        }
    }

    public movements(idx: number): Array<Posture> {
        const result = new Array()
        this.animation[idx].postures.forEach(element => {
            const root = this.animation.getRootPosture(element.name, idx - 1)   
            result.push(new Posture(element.name, new THREE.Euler(
                element.rotation.x - root.rotation.x,
                element.rotation.y - root.rotation.y,
                element.rotation.z - root.rotation.z
            )))
        })
        return result
    }
    public getAnimation():Animation {
        return this.animation
    }
    public getCurrentTime():number  {
        return this.currentTime
    }
    public setCurrentTime(time: number) {
        this.currentTime = time
    }
    public getMaximumTime() {
        return this.maximumTime
    }
    public setMaximumTime(time: number) {
        this.maximumTime = time
    }
    public pause() {
        this.isRunning = false
    }
    public start() {
        this.isRunning = true
    }
    public togglePause() {
        this.isRunning = !this.isRunning
        return this.isRunning
    }
    public getMomentIdx(moment: Moment):number {
        let result = -1
        this.animation.forEach((element, idx) => {
            if(element === moment) {
                result = idx
            }
        })
        return result
    }
}
