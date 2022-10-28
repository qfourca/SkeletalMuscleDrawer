import App from "../app/app";
import Member from "../app/member";

export default class Subtitle extends Member {
    constructor (
        app: App
    ) {
        super(app)
        this.app.currentTime.hang(this.onTimeChange.bind(this))
    }
    private onTimeChange(time: number) {
        this.app.subtitle.set(this.app.animation.get().getSubtitle(time))
    }
}