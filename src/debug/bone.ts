import * as THREE from 'three'
export default class bone {
    private debugBones: Map<string, THREE.Bone>
    constructor(scene: THREE.Scene, bones: Map<string, THREE.Bone>) {
        this.debugBones = bones 
    }
    public selectBone(name: string): THREE.Bone | undefined {
        return this.debugBones.get(name)
    }
}