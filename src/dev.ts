import App from "./index"
//@ts-ignore
import human from './static/asset/man.gltf'
//@ts-ignore
import animation from './static/animation/pushup.json'
//@ts-ignore
import gym from './static/asset/gym.glb'
import './dev.css'
const app = new App (
    document.getElementById('app')!,
    human,
    //@ts-ignore
    animation,
    human
)