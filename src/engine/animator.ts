import { AnimationClip, AnimationMixer, KeyframeTrack } from "three";
import Human from "./human";
import axios from "axios";
import Hook from "../hook";
import Core from "../core";

export default class Animator {
    private human: Human
    private mixer: AnimationMixer
    private animation: Animation
    constructor(
        human: Human,
        animation: rawAnimation
    ) {
        this.human = human
        this.mixer = new AnimationMixer(human.getAnimationTarget())
        this.animation = new Animation(animation)
        Core.core.currentTime.hang(this.onTimeChange.bind(this))
        human.isLoaded.hang((isloaded) => {if(isloaded) this.mixer = new AnimationMixer(human.getAnimationTarget())})
    }
    private before?: AnimationClip
    private onTimeChange(currentTime: number) {
        if(this.animation.isLoaded.get() && this.human.isLoaded.get()) {
            let {
                clipName,
                time
            } = this.animation.timeToAnimationClip(currentTime)
            const animationClip = this.animation.animations.get(clipName)!
            if(this.before != undefined)
                this.mixer.uncacheAction(this.before)
            this.before = animationClip
            const animation = this.mixer.clipAction(animationClip)
            animation.play()
            this.mixer.setTime(animationClip.duration + time / 1000)
        }
    }
}

export class Animation {
    public name: string
    public animations: Map<string, AnimationClip> = new Map()
    public timeline: Array<string>
    public duration: number = 0
    public isLoaded: Hook<boolean> = new Hook(false)
    constructor (
        raw: rawAnimation
    ) {
        this.name = raw.name
        this.timeline = raw.timeline
        this.getAnimations(raw.animations)
            .then((loadedAnimations: Array<{key: string, value: any}>) => {
            loadedAnimations.forEach((info) => {
                this.animations.set(info.key, this.animationInitor(info.value))
            })
            this.timeline.forEach((moment: string) => {
                this.duration += this.animations.get(moment)?.duration! * 1000
            })
            Core.core.maximumTime.set(this.duration)
            this.isLoaded.set(true)
        })
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
    public timeToAnimationClip(time: number): { clipName: string, time: number } {
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
            clipName: clip,
            time: time - temp
        }
    }
    public test(time: number): { clipName: string, time: number } {
        let temp = 0
        let clip: string = this.timeline[0]
        this.timeline.forEach((moment: string) => {
            const get = this.animations.get(moment)!
            console.log(get.duration * 1000)
            if(temp < time) {
                console.log(moment)
                temp += get.duration * 1000
                clip = moment
            }
        })
        return {
            clipName: clip,
            time: temp - time
        }
    }
}

export interface rawAnimation {
    name: string,
    animations: Array<{name: string, src: string}>,
    timeline: Array<string>
}
