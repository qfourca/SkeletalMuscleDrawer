import App, {Performance} from "./index"
//@ts-ignore
import animation from './static/animation/develop.json'

const model = './human.gltf'
const app = new App(
    document.getElementById('app')!,
    model,
    animation
)

const performance:Performance = new Performance()
const update = () => {
    requestAnimationFrame(update)
    const interval = performance.getInterval()
    performance.start()
    app.setCurrentTime(app.getCurrentTime() + interval)
    app.update()
    performance.end()
}
update()