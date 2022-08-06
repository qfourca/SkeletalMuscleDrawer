import * as THREE from 'three'
import Posture from '../posture'
import TimeLine from '../timeline'
export default class BoneMover {
    public bones: Map<string, THREE.Bone> = new Map()
    private boneMoves:Array<BoneMove> = new Array()  
    private currentTime: number = -1
    public posture:Array<Posture> = new Array()
    constructor(
        
    ) {

    }
    public setBones(bone:THREE.Bone) {
        this.bones.set(bone.name, bone)
        bone.children.forEach((element:any) => {
            this.setBones(element)
        });
        this.setPosture()
    }
    public animate(timeLine: TimeLine) {
        // console.log(this.bones)
        timeLine.getTimeLine()[0].forEach((element: Posture) => {
            // console.log(this.bones.get(element.name)?.rotation, element.rotation)
            this.bones.get(element.name)?.rotation.set(element.rotation.x, element.rotation.y, element.rotation.z, element.rotation.order)
        })
        for(let i = 1 ; i < timeLine.getTimeLine().length; i++) {
            timeLine.movements(i).forEach((element: Posture) => {
                this.moveBone(
                    element.name,
                    element.rotation,
                    i * 2000,
                    (i - 1) * 2000
                )
            })
        }
    }
    public update() {
        const now = performance.now() - this.currentTime
        this.currentTime = performance.now()
        this.executeBoneMovement(now)
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
    private setPosture() {
        this.posture = new Array()
        this.bones.forEach((value:THREE.Bone, key:string) => {
            this.posture!.push({
                name: key,
                rotation: value.rotation
            })
        })
    }
    public moveBone(name: string, move: THREE.Euler, taken: number, reservation?: number ) {
        reservation = reservation === undefined ? 0 : reservation
        move = new THREE.Euler(move.x / taken, move.y / taken, move.z / taken)
        this.boneMoves.push({ name, move, taken, reservation })
    }

}

export interface BoneMove {
    name: string
    move: THREE.Euler
    taken: number
    reservation: number
}