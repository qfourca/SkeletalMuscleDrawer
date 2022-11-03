import App from "./index"

import human from '../static/asset/untitled.glb'
import gym from '../static/asset/gym.glb'
import animation from '../static/animation/squart.json'
import './dev.css'
const app = new App (document.getElementById('app')!, human, gym)
//@ts-ignore
app.animate(animation)
