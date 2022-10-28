import axios from "axios";
import { AnimationClip, KeyframeTrack } from "three";
import Hook from "../hook";
import RawAnimation from "./raw";

export default class Animation {
    public name: string
    public animations: Map<string, AnimationClip> = new Map()
    public timeline: Array<string>
    public isLoading: Hook<boolean> = new Hook(true)
    public duration: number = 0
    constructor (
        raw: RawAnimation
    ) {
        this.name = raw.name
        this.timeline = raw.timeline
        this.getAnimations(raw.animations).then(this.onAnimationLoaded.bind(this))
    }
    private getAnimations(animations: Array<{name: string, src: string}>):Promise<any> {
        return Promise.all(animations.map((animation) => (async () => {
            return { key: animation.name, value: (await axios.get(animation.src)).data }
        })()))
    }
    private animationInitor(animation: any): AnimationClip {
        return new AnimationClip(
            animation.name,
            animation.duration,
            animation.tracks.map((keyframe: any) => new KeyframeTrack(keyframe.name, keyframe.times, keyframe.values)),
            animation.blendMode
        )
    }
    private onAnimationLoaded(loadedAnimations: Array<{key: string, value: any}>) {
        loadedAnimations.forEach((info) => {
            this.animations.set(info.key, this.animationInitor(info.value))
        })
        this.timeline.forEach((moment: string) => {
            this.duration += this.animations.get(moment)?.duration! * 1000
        })
        this.isLoading.set(false)
    }
    public timeToAnimationClip(time: number): { clip: AnimationClip, time: number } {
        let temp = 0
        let clip: string = this.timeline[0]
        this.timeline.forEach((moment: string) => {
            const get = this.animations.get(moment)!
            if(temp < time) {
                temp += get.duration * 1000
                clip = moment
            }
        })
        return {
            clip: this.animations.get(clip)!,
            time: time - temp
        }
    }
    // public test(time: number): { clipName: string, time: number } {
    //     let temp = 0
    //     let clip: string = this.timeline[0]
    //     this.timeline.forEach((moment: string) => {
    //         const get = this.animations.get(moment)!
    //         console.log(get.duration * 1000)
    //         if(temp < time) {
    //             console.log(moment)
    //             temp += get.duration * 1000
    //             clip = moment
    //         }
    //     })
    //     return {
    //         clipName: clip,
    //         time: temp - time
    //     }
    // }
}