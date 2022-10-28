import App from "../app";
import Member from "../app/member";
import { Performance } from "../util";

export default class Updator extends Member {
    private performance: Performance
    constructor (
        app: App
    ) {
        super(app)
        this.performance = new Performance()
        this.app.updateClock.hang(this.timeUpdate.bind(this))
        this.update()
    }
    private timeUpdate(updatedTime: number) {
        if(!this.app.isPaused.get()) {
            const maximumTime = this.app.animation.get().duration
            const delta = this.app.currentTime.get() + updatedTime
            this.app.currentTime.set(
                delta < 0 ? 0 :
                delta > maximumTime ? maximumTime : delta
            )
        }
    }
    private update() {
        requestAnimationFrame(this.update.bind(this))
        this.performance.start()
        this.app.updateClock.set(this.performance.getInterval())
        this.performance.end()
    }
}