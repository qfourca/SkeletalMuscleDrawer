import Member from "../app/member";
import App from "../app/app";
import Hook from "../hook";
import { Model } from "./model";
import Three from "./three";

export default class Engine extends Member {
    private three: Three
    constructor (
        app: App
    ) {
        super(app)
        this.three = new Three(app.rootElement.get())

        Hook.hookAll([
            app.human,
            app.human.get().isLoading,
        ], () => this.render(app.human.get()))
        Hook.hookAll([
            app.world,
            app.world.get().isLoading,
        ], () => this.render(app.world.get()))

        app.updateClock.hang(this.three.update.bind(this.three))
    }
    private render(model: Model) {
        if(!model.isLoading.get()) {
            this.three.getScene().add(model.body!.scene)
        }
    }
}