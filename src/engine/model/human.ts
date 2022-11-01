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
        this.body?.scene.scale.set(0.5, 0.5, 0.5)
        if(!isLoading) {
            // console.log(this.body!.animations)
            this.body?.animations.forEach((animation: AnimationClip) => {
                // Human.download(animation, animation.name)
            })
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
    private static download(content: object, name: string) {
        const link = document.createElement('a');
        link.download = 'name.json';
        const blob = new Blob([JSON.stringify(content)], {type: 'text/plain'});
        link.href = window.URL.createObjectURL(blob);
        link.click();
    }
}