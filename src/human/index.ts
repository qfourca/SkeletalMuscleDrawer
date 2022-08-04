import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import Posture from "../posture";

export default class Human {
    private scene:THREE.Scene
    public posture?:Array<Posture>
    public body: any
    public bones:Map<string, THREE.Bone> = new Map()
    private loading:boolean = true
    private boneMoves:Array<BoneMove> = new Array()    
    private currentTime:number = -1

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
    private onLoad (gltf:any) {
        this.body = gltf.scene
        this.setBones(gltf.scene.children[0].children.find((el:any) => el.type === 'Bone'))
        this.setPosture()
        this.scene.add(gltf.scene);
        this.currentTime = performance.now()
        this.loading = false
    }
    private onProgress (xhr:any) {
        // console.log( Math.round(xhr.loaded / 4783071 * 100) + '%');
    }
    private onError (error:any) {
        console.log("Error occur on loading:" + error);
    }
    public update() {
        if(!this.loading) {
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
    public selectBone(name: string): THREE.Bone | undefined {
        return this.bones.get(name)
    }
    public getBones(): Array<string> {
        let result = new Array()
        this.bones.forEach((val: THREE.Bone, key: string) => {
            result.push(key)
        })
        return result
    }
    public isLoading(): boolean {
        return this.loading
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