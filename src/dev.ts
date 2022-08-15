import { App, UI } from "./index"
//@ts-ignore
import animation from './static/animation/develop.json'
const app = new App(
    document.getElementById('app')!,
    './human.gltf',
    animation,
    { UI: UI.animation}
)