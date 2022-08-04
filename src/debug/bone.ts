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

class DebugBone {
    private static DefaultMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    constructor(scene: THREE.Scene, bone:THREE.Bone) {
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const cube = new THREE.Mesh( geometry, DebugBone.DefaultMaterial );
        cube.position.set(bone.position.x, bone.position.y, bone.position.z)
        scene.add(cube)
    }
}