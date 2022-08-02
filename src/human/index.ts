import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
export default class Human {
    private scene:THREE.Scene
    private bones:Map<string, THREE.Bone> = new Map()
    constructor(name: string, scene: THREE.Scene) {
        this.scene = scene
        const loader = new GLTFLoader();
        loader.load(
            name,
            this.onLoad.bind(this),
            this.onProgress.bind(this),
            this.onError.bind(this)
        );
    }
    private onLoad (gltf:any) {
        this.scene.add(gltf.scene);
        gltf.scene.scale.set(10, 10, 10)

        const a = gltf.scene.children[0].children.find((el:any) => el.type === 'Bone')
        
        this.setBones(a)
        // console.log(this.bones.get("neck")!.rotation.x)
    }
    private onProgress (xhr:any) {
        // console.log( Math.round(xhr.loaded / 4783071 * 100) + '%');
    }
    private onError (error:any) {
        console.log("Error occur on loading:" + error);
    }
    public update() {

    }
    private setBones (bone:THREE.Bone) {
        this.bones.set(bone.name, bone)
        console.log(bone.name, bone.rotation)
        bone.children.forEach((element:any) => {
            this.setBones(element)
        });
    }
}