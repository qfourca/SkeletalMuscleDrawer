import { UpdateAble } from "../app/update";
import { Performance } from "../util";

export default class Updater extends Array<UpdateAble> {
    private performance: Performance = new Performance()
    constructor (
         
    ) {
        super()
        requestAnimationFrame(this.update.bind(this))
    }
    private update() {
        requestAnimationFrame(this.update.bind(this))
        this.performance.start()
        const interval = this.performance.getInterval()
        this.forEach((updateable) => {
            updateable.update(interval)
        })
        this.performance.end()
    }
    public dispatch = (updateable: UpdateAble) => {
        for(let i = 0; i < this.length; i++) {
            if(this[i] === updateable)  {
                this.splice(i, 1);
                i--;
            }
          }
    }
}

