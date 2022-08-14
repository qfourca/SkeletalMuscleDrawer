import { Bone } from 'three'
import Posture from '../animation/posture'
export default class Skeleton {
    private bones: Map<string, Bone> = new Map()
    private names: Array<string> = new Array()
    constructor(
        bone?: Bone
    ) {
        if(bone != undefined) this.setBones(bone)
    }
    public setBones(bone: Bone) {
        this.bones.set(bone.name, bone)
        this.names.push(bone.name)
        bone.children.forEach((element:any) => {
            this.setBones(element)
        });
    }
    public getBone(name: string): Bone | undefined {
        return this.bones.get(name)
    }
    public getBoneNames(): Array<string> {
        return this.names
    }
    public getCurrentPosture(): Array<Posture> {
        const result = new Array()
        this.forEach((bone: Bone) => {
            result.push(new Posture(bone.name, bone.rotation))
        })
        return result
    }
    public forEach(callBack: (bone: Bone, name: string, idx: number) => void) {
        const length = this.names.length
        for(let i = 0; i < length; i++) {
            callBack(this.bones.get(this.names[i])!, this.names[i], i)
        }
    }
}