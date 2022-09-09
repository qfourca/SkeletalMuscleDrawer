import { App } from "./index"
//@ts-ignore
import animation from './static/animation/develop.json'

const model = './final.gltf'
const app = new App(
    document.getElementById('app')!,
    model,
    animation
)