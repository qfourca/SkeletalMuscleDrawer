import { App, TimeLine, BoneName, Vector3, Euler } from "./index"

const app = new App(
    document.getElementById('app')!,
    './human.gltf',
    { devMode: true }
)

// axios.get('./animation.json')
// .then((result) => {
//     let timeLine:Array<Array<Posture>> = new Array()
//     result.data.timeLine.forEach((line: Array<any>, i: number) => {
//         let one:Array<Posture> = new Array()
//         line.forEach((element ,j) => {
//             one.push(
//                 new Posture(element.name,
//                      new Euler(element.rotation._x, 
//                                element.rotation._y, 
//                                element.rotation._z, 
//                                element.rotation._order)))
//         })
//         timeLine.push(one)
//         one = new Array()
//     })
//     app.human.executeOnLoad(app.human.animate.bind(app.human), new TimeLine(timeLine))
// })
// .catch(console.error)