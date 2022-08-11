import { App, Animation, UI } from "./index"
import axios from "axios"
const app = new App(
    document.getElementById('app')!,
    './human.gltf',
    { UI: UI.animation}
)

axios.get('./test.json')
.then((result) => {
    app.animate(new Animation(result.data.timeLine))
})
.catch(console.error)