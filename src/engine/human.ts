import { AnimationClip, AnimationMixer, Bone, KeyframeTrack } from "three";
import { UpdateAble } from "../app/update";
import Model from "./model";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export default class Human extends Model implements UpdateAble {
    private bones: Map<string, Bone> = new Map()
    private mixer?: AnimationMixer
    constructor(
        file: string
    ) {
        super(file)
        this.isLoaded.hang((val: boolean) => {
            if(val) {
                this.setBones(this.body)
                this.body.scale.set(0.6, 0.6, 0.6)
                //@ts-ignore
                // this.mixer = new AnimationMixer( this.gltf?.scene.children[0] );
                // console.log(this.gltf?.animations[3])
                // downloadFile(this.gltf?.animations[3], "pointing")
                // const anime = this.mixer.clipAction(this.gltf?.animations[3]!)
                // this.mixer.clipAction(this.gltf?.animations[0]!)
                // anime.play()
            }
        })
    }
    private readonly BalckList = [
        "Finger",
        "Eyebrow"
    ]
    private setBones(bone: Bone) {
        this.bones.set(bone.name, bone)
        bone.children.forEach((element:any) => {
            this.setBones(element)
        });
    }
    public getBone(name: string): Bone | undefined {
        return this.bones.get(name)
    }
    public getBoneNames(): Array<string> {
        const result = new Array()
        this.bones.forEach((value: Bone, key: string) => {
            let black: boolean = false
            this.BalckList.forEach((s: string) => {if(key.includes(s)) black = true})
            if(!black)
                result.push(key)
        })
        return result
    }
    public update(interval: number) {
        if(this.mixer != undefined) {
            this.mixer.setTime(this.mixer.time + interval / 1000)
        }
    }
    public getAnimationTarget() {
        return this.gltf?.scene.children[0]!
    }
}

const animationAdd = (gltf: GLTF, animation: any) => {
    gltf.animations.push(new AnimationClip(
        animation.name,
        animation.duration,
        animation.tracks.map((keyframe: any) => new KeyframeTrack(keyframe.name, keyframe.times, keyframe.values)),
        animation.blendMode
    ))
}
const downloadFile = (content: any, name: string) => {
    content.name = name
    content = JSON.stringify(content)
    const blob = new Blob([content], {type: 'text/json'})
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${name}.json`
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url);
  }