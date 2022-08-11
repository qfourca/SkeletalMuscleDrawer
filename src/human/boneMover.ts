// import * as THREE from 'three'
// import Posture from '../posture'
// import Animation from '../animation'
// import Skeleton from './skeleton'
// export default class BoneMover {
//     private skeleton:Skeleton
//     private currentTime: number = -1
//     private boneMoves:Array<BoneMove> = new Array()
//     constructor(
//         skeleton: Skeleton
//     ) {
//         this.skeleton = skeleton
//     }
//     public animate(timeLine: Animation) {
//         timeLine[0].postures.forEach((element: Posture) => {
//             this.skeleton.getBone(element.name)?.rotation.set(
//                 element.rotation.x, 
//                 element.rotation.y, 
//                 element.rotation.z, 
//                 element.rotation.order
//             )
//         })
//         const length = timeLine.length
//         for(let i = 1 ; i < length; i++) {
//             const { reservation, run } = timeLine.getTime(i)
//             timeLine.movements(i).forEach((element: Posture) => {
//                 this.moveBone(
//                     element.name,
//                     element.rotation,
//                     run,
//                     reservation
//                 )
//             })
//         }
//     }
//     public update() {
//         const now = performance.now() - this.currentTime
//         this.currentTime = performance.now()
//         this.executeBoneMovement(now)
//     }
//     private executeBoneMovement(now: number) {
//         this.boneMoves.forEach((element:BoneMove, idx:number) => {
//             let delta = now
//             if(element.reservation > 0) {
//                 element.reservation -= delta
//                 if(element.reservation < 0) {
//                     delta = element.reservation * -1
//                     element.reservation = 0
//                 }
//             }
//             if(element.reservation <= 0) {
//                 element.taken -= delta
//                 if(element.taken < 0)  { 
//                     this.boneMoves.splice(idx, 1)
//                     delta += element.taken
//                 }
//                 const bone:THREE.Bone = this.skeleton.getBone(element.name)!
//                 bone.rotation.set(
//                     bone.rotation.x + element.move.x * delta,
//                     bone.rotation.y + element.move.y * delta,
//                     bone.rotation.z + element.move.z * delta
//                 )
//             }
//         })
//     }

//     public moveBone(name: string, move: THREE.Euler, taken: number, reservation?: number ) {
//         reservation = reservation === undefined ? 0 : reservation
//         move = new THREE.Euler(move.x / taken, move.y / taken, move.z / taken)
//         this.boneMoves.push({ name, move, taken, reservation })
//     }
// }

// export interface BoneMove {
//     name: string
//     move: THREE.Euler
//     taken: number
//     reservation: number
// }