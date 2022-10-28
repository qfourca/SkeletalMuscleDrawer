import { AnimationClip, AnimationMixer } from "three";
import Model from "./model";

export default class Human extends Model {
    private before?: AnimationClip
    private mixer?: AnimationMixer
    constructor (
        fileName: string
    ) {
        super(fileName)
        this.isLoading.hang(this.afterLoad.bind(this))
    }
    private afterLoad(isLoading: boolean) {
        if(!isLoading) {
            this.mixer = new AnimationMixer(this.body!.scene)
        }
    }
    public animate(clip: AnimationClip, time: number) {
        if(this.mixer != undefined) {
            if(this.before != undefined)
            this.mixer.uncacheAction(this.before)
            this.before = clip
            const animation = this.mixer.clipAction(clip)
            animation.play()
            this.mixer.setTime(clip.duration + time / 1000)
        }
    }
}