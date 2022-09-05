import { App, UI } from "./index"
//@ts-ignore
import animation from './static/animation/re.json'

const model = './final.gltf'
const app = new App(
    document.getElementById('app')!,
    model,
    animation,
    { 
        UI: UI.animation
    }
)