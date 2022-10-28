import axios from "axios";
import { AnimationClip, KeyframeTrack } from "three";
import Hook from "../hook";
import RawAnimation from "./raw";

export default class Animation {
    public name: string
    private animations: Map<string, AnimationClip> = new Map()
    private subtitles: Array<Subtitle> = new Array()
    private timeline: Array<string>
    public isLoading: Hook<boolean> = new Hook(true)
    public duration: number = 0
    constructor (
        raw: RawAnimation
    ) {
        this.name = raw.name
        this.timeline = raw.timeline
        this.subtitles = raw.subtitles
        this.subtitles.sort((a: Subtitle, b: Subtitle) => a.start - b.start)
        this.subtitles.forEach((element: Subtitle, idx: number) => {
            if(element.end === undefined) {
                this.subtitles[idx].end = this.subtitles[idx + 1].start
            }
        })
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
    public getAnimationClip(time: number): { clip: AnimationClip, time: number } {
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
    public getSubtitle(time: number): string {
        let result = ""
        this.subtitles.forEach((element) => {
            if(time >= element.start && time < element.end!) {
                result = element.content
            }
        })
        return result
    }
}

export interface Subtitle {
    start: number,
    end?: number,
    content: string
}