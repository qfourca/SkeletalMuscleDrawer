import App from "./index"

import human from '../static/asset/man.gltf'
import gym from '../static/asset/gym.glb'
import animation from '../static/animation/pushup.json'
import './dev.css'
const app = new App (document.getElementById('app')!, human, human)