import App, {Performance} from "./index"
//@ts-ignore
import animation from './static/animation/develop.json'
//@ts-ignore
import human from './static/asset/man.glb'
const app = new App(
    document.getElementById('app')!,
    human,
    animation
)