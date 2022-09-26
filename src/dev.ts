import App, {Performance} from "./index"
//@ts-ignore
import animation from './static/animation/develop.json'

const model = './human.gltf'
const app = new App(
    document.getElementById('app')!,
    model,
    animation
)