import { App, BoneName, Vector3 } from "./index"

const app = new App(
    window.innerWidth, 
    window.innerHeight,
    './human.gltf'
)

// window.addEventListener('resize', () => {
//     app.resize(window.innerWidth, window.innerHeight)
// }, false)
// app.moveBone(
//     BoneName.spine1,
//     new Vector3(1.5, 0, 0),
//     1500
// )

// app.moveBone(
//     BoneName.right_bottom_arm, 
//     new Vector3(0, 0, -1.5), 
//     1000
// )
// app.moveBone(
//     BoneName.right_shoulder, 
//     new Vector3(0, -0.5, -0.5), 
//     1000
// )
// app.moveBone(
//     BoneName.right_wrist, 
//     new Vector3(-0.5, -1, -1), 
//     1000
// )