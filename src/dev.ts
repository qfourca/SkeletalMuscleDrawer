import { App, TimeLine, UI } from "./index"
import axios from "axios"
const app = new App(
    document.getElementById('app')!,
    './human.gltf',
    { UI: UI.production}
)

axios.get('./test.json')
.then((result) => {
    app.animate(new TimeLine(result.data.timeLine))
})
.catch(console.error)