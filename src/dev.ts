import App from './app'
import BoneName from './bonename'
import { Vector3 } from 'three'
const app = new App(window.innerWidth, window.innerHeight)

window.addEventListener('resize', () => {
    app.resize(window.innerWidth, window.innerHeight)
}, false)


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