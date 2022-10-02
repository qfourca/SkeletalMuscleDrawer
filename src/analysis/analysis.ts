export default abstract class Analysis {
    constructor (
        onResult: (info: exerciseInfo) => void
    ) {
        this.onResult = onResult
    }
    protected static readonly maxScore: number = 100
    protected onResult: (info: exerciseInfo) => void
    protected abstract readonly needInfo: Array<string>
    protected abstract onInput:(arg: Map<string, number>) => void
    protected pick(arg: Map<string, number>):Map<string, number> | undefined {
        const result:Map<string, number> = new Map()
        for(let i = 0; i < this.needInfo.length; i++) {
            const temp = arg.get(this.needInfo[i])
            if(temp === undefined) return undefined
            else result.set(this.needInfo[i], temp)
        }
        return result
    }
    public input(arg: Map<string, number>) {
        const temp = this.pick(arg)
        if(temp != undefined) this.onInput(temp)
    }
    protected static RadianToDegree = (radian: number) => radian * 180 / Math.PI
    protected static DegreeToRadian = (degree: number) => degree * Math.PI / 180
}
export interface exerciseInfo {
    count: number,
    score: number
}