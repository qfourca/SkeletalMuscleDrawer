import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import Posture from "../posture";

export default class Human {
    private scene:THREE.Scene
    public posture?:Array<Posture>
    private bones:Map<string, THREE.Bone> = new Map()
    private boneMoves:Array<BoneMove> = new Array()    
    private currentTime:number = -1

    // private temp:Array<Posture> = new Array() // 자세 저장 개발용 변수
    constructor(
        file: string,
        scene: THREE.Scene,
        posture?: Array<Posture>
    ) {
        this.scene = scene
        this.posture = posture

        if(posture != undefined) this.posture = posture
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
        this.setPosture()
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
            this.currentTime = performance.now()
            this.executeBoneMovement(now)
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
        });
    }
    private setPosture() {
        if(this.posture == undefined) {
            this.posture = new Array()
            this.bones.forEach((value:THREE.Bone, key:string) => {
                this.posture!.push({
                    name: key,
                    rotation: value.rotation
                })
            })
        }
        else {
            for(let i = 0; i < this.posture.length; i++) {
                const element:Posture = this.posture[i]
                const bone:THREE.Bone = this.bones.get(element.name)!
                bone.rotation.set(bone.rotation.x, bone.rotation.y, bone.rotation.z, bone.rotation.order)
            }
        }

    }
    private executeBoneMovement(now: number) {
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
    }

}

export interface BoneMove {
    name: string
    move: THREE.Vector3
    taken: number
    reservation: number
}
export interface Option {
    devMode?: boolean //개발 모드
    posture?: any
}