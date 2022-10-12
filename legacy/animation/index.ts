// import Moment from "./moment"
// import Finder from "./finder";
// import { Euler } from "three";

// export default class Animation extends Array<Moment> {
//     public finder: Finder
//     constructor (
//         file: RawAnimation
//     ) {
//         super()
//         this.onResult(file)
//         this.finder = new Finder(this)
//     }

//     private onResult = (result: RawAnimation) => {
//         result.timeline.forEach((element: RawMoment) => {
//             const postures: Map<string, Euler> = new Map()
//             element.postures.forEach(posture => {
//                 postures.set(posture.name, posture.rotation)
//             })
//             this.push({
//                 postures,
//                 time: element.time
//             })
//         })
//     }
// }

// interface RawAnimation {
//     timeline: Array<RawMoment>
// }
// interface RawMoment {
//     postures: Array<RawPosture>
//     time: number
// }
// interface RawPosture {
//     name: string,
//     rotation: Euler
// }

// export  {
//     Moment as Moment,
//     RawAnimation as RawAnimation
// }