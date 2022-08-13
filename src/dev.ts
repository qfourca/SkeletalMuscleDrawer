import { App, Animation, UI } from "./index"
import axios from "axios"
//@ts-ignore
import animation from './static/animation/test.json'
const app = new App(
    document.getElementById('app')!,
    './human.gltf',
    { UI: UI.production}
)
app.animate(animation)
