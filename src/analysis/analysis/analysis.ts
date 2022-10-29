export default abstract class Posture {
    constructor (

    ) {

    }
    protected static readonly maxScore: number = 100

    protected abstract readonly needInfo: Array<string>

    protected abstract readonly accuracy: number

    protected abstract onInput:(arg: Map<string, number>) => exerciseResult | undefined
    
    protected accuracyCheck(arg: Map<string, {
        name: string,
        accuracy: number,
        value: number
    }>):boolean {
        let sum = 0
        this.needInfo.forEach((name: string) => {
            const get = arg.get(name)
            if(get != undefined) {
                sum += get.accuracy
            }
        })
        return sum / this.needInfo.length > this.accuracy
    }

    public input(arg: Map<string, {
        name: string,
        accuracy: number,
        value: number
    }>): exerciseResult | undefined {
        if(this.accuracyCheck(arg)) {
            const temp = new Map()
            arg.forEach((value, key) => {
                temp.set(key, value.value)
            })
            return this.onInput(temp)
        }
        return undefined
    }

    protected static RadianToDegree = (radian: number) => radian * 180 / Math.PI
    protected static DegreeToRadian = (degree: number) => degree * Math.PI / 180
}
export interface exerciseResult {
    score: number,
    deductions: Array<{
        jointName: string,
        deduction: number,
        phrases: string
    }>
}