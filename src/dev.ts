import { App, TimeLine } from "./index"
import axios from "axios"
const app = new App(
    document.getElementById('app')!,
    './human.gltf',
    { devMode: true }
)

axios.get('./animation.json')
.then((result) => {
    app.human.executeOnLoad(() => { app.human.animate(new TimeLine(result.data.timeLine)) })
})
.catch(console.error)