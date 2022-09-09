import { Euler } from "three"
import Animation from "./"
export default class Finder {
    private animation: Animation
    constructor (
        animation: Animation
    ) {
        this.animation = animation
    }

    public getTimePosture(time: number, boneNames: Array<string>): Map<string, Euler> {
        const result: Map<string, Euler> = new Map()
        const idx = this.getTimeToIndex(time)
        if(idx != -1) {
            boneNames.forEach((boneName: string) => {
                const future = this.animation[idx].postures.get(boneName)
                const past = this.getRootPosture(idx - 1, boneName)
                if(future === undefined) {
                    result.set(boneName, past)
                }
                else {
                    const pastTime = this.animation[idx - 1].time
                    const futureTime = this.animation[idx].time
                    const percent = (time - pastTime) / (futureTime - pastTime)
                    result.set(
                        boneName,
                        new Euler(
                            past.x + (future.x - past.x) * percent,
                            past.y + (future.y - past.y) * percent,
                            past.z + (future.y - past.y) * percent
                        )
                    )
                }
            })
        }
        return result
    }

    public getTimeToIndex(time: number): number {
        for(let i = 1; i < this.animation.length; i++) {
            if(this.animation[i].time > time)
                return i
        }
        return -1
    }

    public getRootPosture(idx: number, boneName: string) {
        for(;idx > -1;idx--) {
            const get = this.animation[idx].postures.get(boneName)
            if(get != undefined) {
                return get
            }
        }
        return new Euler(0, 0, 0)
    }
}