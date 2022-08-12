import * as THREE from 'three'
import Posture from '../posture'
import Animation, { Moment } from '../animation'
import { Skeleton } from '../human'
export default class Animator {
    private skeleton = new Skeleton()
    public performanceTime: number = -1
    public maximumTime: number = -1
    public currentTime: number = -1
    private boneMoves:Array<BoneMove> = new Array()
    constructor(

    ) {

    }
    public animate(animation: Animation, skeleton: Skeleton) {
        this.skeleton = skeleton
        this.maximumTime = animation.getTime(animation.length - 1).reservation + animation.getTime(animation.length - 1).run
        const length = animation.length
        animation.movements(0).forEach((element: Posture) => {
            this.skeleton.getBone(element.name)?.rotation.set(element.rotation.x, element.rotation.y, element.rotation.z)
        })
        for(let i = 1; i < length; i++) {
            const { reservation, run } = animation.getTime(i)
            animation.movements(i).forEach((element: Posture) => {
                this.moveBone(
                    element.name,
                    element.rotation,
                    run,
                    reservation
                )
            })
        }
        this.currentTime = 0
    }
    public update() {
        const now = performance.now() - this.performanceTime
        this.performanceTime = performance.now()
        this.currentTime += now
        if(this.currentTime > this.maximumTime) this.currentTime = this.maximumTime
        this.executeBoneMovement(now)
    }
    private executeBoneMovement(now: number) {
        this.boneMoves.forEach((element:BoneMove, idx:number) => {
            let delta = now
            if(element.reservation > 0) {
                element.reservation -= delta
                if(element.reservation < 0) {
                    delta = element.reservation * -1
                    element.reservation = 0
                }
            }
            if(element.reservation <= 0) {
                element.taken -= delta
                if(element.taken < 0)  { 
                    this.boneMoves.splice(idx, 1)
                    delta += element.taken
                }
                const bone:THREE.Bone = this.skeleton.getBone(element.name)!
                bone.rotation.set(
                    bone.rotation.x + element.move.x * delta,
                    bone.rotation.y + element.move.y * delta,
                    bone.rotation.z + element.move.z * delta
                )
            }
        })
    }
    private moveBone(name: string, move: THREE.Euler, taken: number, reservation?: number ) {
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