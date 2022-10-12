import { UpdateAble } from "../app/update";
import Human from "./human";
import Animator from "./animator";
import World from "./world";
import Subtitles, { Subtitle } from "./subtitle";

export default class Engine implements UpdateAble {
    private human: Human
    private world: World
    private animator: Animator
    private subtitles: Subtitles
    constructor (
        human: string,
        animation: string | any,
        world: string
    ) {
        this.human = new Human(human)
        this.world = new World(world)
        this.animator = new Animator(this.human, animation)
        this.subtitles = new Subtitles(animation.subtitle)
        // this.animation = new Animation(animation)
    }
    public update = (interval: number) => {
        // if(this.human.isLoaded.get()) {
        //     const current = this.animation.finder.getTimePosture(Core.core.currentTime.get(), this.human.getBoneNames())
        //     current.forEach((value, key) => {
        //         //@ts-ignore
        //         this.human.getBone(key)?.rotation.set(value._x, value._y, value._z, value._order)
        //     })
        // }
        this.human.update(interval)
    }
}