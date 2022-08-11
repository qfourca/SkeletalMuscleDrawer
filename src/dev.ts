import { App, Animation, UI } from "./index"
import axios from "axios"
const app = new App(
    document.getElementById('app')!,
    './human.gltf',
    { UI: UI.animation}
)
app.animate('./test.json')
