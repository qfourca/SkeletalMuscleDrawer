import { App, BoneName, Vector3 } from "./index"

const app = new App(
    document.getElementById('app')!,
    './human.gltf',
    { devMode: true }
)

// 
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