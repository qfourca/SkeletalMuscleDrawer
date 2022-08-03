import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import Posture from "../posture";
import axios from 'axios'
export default class Human {
    private scene:THREE.Scene
    private posture:string
    private bones:Map<string, THREE.Bone> = new Map()
    private boneMoves:Array<BoneMove> = new Array()    
    private currentTime:number = -1

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
        this.currentTime = performance.now()
    }
    private onProgress (xhr:any) {
        // console.log( Math.round(xhr.loaded / 4783071 * 100) + '%');
    }
    private onError (error:any) {
        console.log("Error occur on loading:" + error);
    }
    public update() {
        if(this.currentTime != -1) {
            const now = performance.now() - this.currentTime
            this.boneMoves.forEach((element:BoneMove, idx:number) => {
                let delta = now
                if(element.reservation > 0) {
                    element.reservation -= delta
                    if(element.reservation < 0) {
                        delta += element.reservation * -1
                        element.reservation = 0
                    }
                }

                if(element.reservation <= 0) {
                    element.taken -= now
                    if(element.taken < 0)  { 
                        this.boneMoves.splice(idx, 1)
                        delta += element.taken
                    }
                    const bone:THREE.Bone = this.bones.get(element.name)!
                    bone.rotateX(element.move.x * delta)
                    bone.rotateY(element.move.y * delta)
                    bone.rotateZ(element.move.z * delta)
                }
            })
            this.currentTime = performance.now()
        }
    }
    public moveBone(name: string, move: THREE.Vector3, taken: number, reservation?: number ) {
        reservation = reservation === undefined ? 0 : reservation
        move = new THREE.Vector3(move.x / taken, move.y / taken, move.z / taken)
        
        this.boneMoves.push({ name, move, taken, reservation })
    }
    private setBones (bone:THREE.Bone) {
        this.bones.set(bone.name, bone)
        bone.children.forEach((element:any) => {
            this.setBones(element)
            // console.log(element.name)
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

interface BoneMove {
    name: string
    move: THREE.Vector3
    taken: number
    reservation: number
}