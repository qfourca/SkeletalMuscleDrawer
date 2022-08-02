import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import Posture from "../posture";
import axios from 'axios'
export default class Human {
    private scene:THREE.Scene
    private posture:string
    private bones:Map<string, THREE.Bone> = new Map()
    // private temp:Array<Posture> = new Array() // 자세 저장 개발용 변수
    constructor(
        file: string,
        posture: string,
        scene: THREE.Scene
    ) {
        this.scene = scene
        this.posture = posture
        const loader = new GLTFLoader();
        loader.load(
            file,
            this.onLoad.bind(this),
            this.onProgress.bind(this),
            this.onError.bind(this)
        );
    }
    private async onLoad (gltf:any) {
        gltf.scene.scale.set(10, 10, 10)
        this.setBones(gltf.scene.children[0].children.find((el:any) => el.type === 'Bone'))
        await this.setPosture(this.posture)
        this.scene.add(gltf.scene);
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
        const posture:Posture = { name: bone.name, rotation: bone.rotation }
        bone.children.forEach((element:any) => {
            this.setBones(element)
        });
    }
    private async setPosture(file:string) {
        const posture = await import(`../posture/${file}.json`)
        for(let i = 0; i < posture.length; i++) {
            const element:Posture = posture[i]
            const bone:THREE.Bone = this.bones.get(element.name)!
            bone.rotation.set(bone.rotation.x, bone.rotation.y, bone.rotation.z, bone.rotation.order)
        }
    }
}