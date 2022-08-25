import { App, UI } from "./index"
//@ts-ignore
import animation from './static/animation/test.json'

const model = './human.gltf'
const app = new App(
    document.getElementById('app')!,
    model,
    animation,
    { 
        UI: UI.production
    }
)