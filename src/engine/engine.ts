import Member from "../app/member";
import App from "../app/app";
import Hook from "../hook";
import { Human, Model, World } from "./model";
import Three from "./three";

export default class Engine extends Member {
    private three: Three
    private human: Human
    private world: World
    constructor (
        app: App
    ) {
        super(app)
        this.three = new Three(this.app)
        this.human = new Human(this.app.human.get())
        this.world = new World(this.app.world.get())

        this.human.isLoading.hang(() => this.render(this.human))
        this.world.isLoading.hang(() => this.render(this.world))

        app.updateClock.hang(this.three.update.bind(this.three))
        app.currentTime.hang(this.onTimeChange.bind(this))
        app.modal.hang(this.onModalChange.bind(this))
    }
    private render(model: Model) {
        if(!model.isLoading.get()) {
            this.three.getScene().add(model.body!.scene)
        }
        this.app.isLoading.set(this.world.isLoading.get() || this.human.isLoading.get())
    }
    private onTimeChange(currentTime: number) {
        if(
            !this.app.animation.get().isLoading.get() &&
            !this.human.isLoading.get()
        ) {
            const {
                clip,
                time
            } = this.app.animation.get().getAnimationClip(currentTime)
            this.human.animate(clip, time)
        }
    }
    private onModalChange() {
        this.three.orbitcontrolEnable(this.app.modal.get().component == undefined)
    }
}