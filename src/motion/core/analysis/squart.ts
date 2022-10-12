import { JointList } from "../..";
import Analysis from "./analysis";

export default class SquartAnalysis extends Analysis {
    private stand:Array<Map<string, number>> = new Array()
    private sit:Array<Map<string, number>> = new Array()
    private currentMode: boolean = false
    protected readonly needInfo = [
        JointList.leftHipX,
        JointList.rightHipX,
        JointList.leftHipY,
        JointList.rightHipY,
        JointList.leftLeg,
        JointList.rightLeg
    ]
    public onInput = (arg: Map<string, number>) => {
        const before = this.currentMode
        this.currentMode = Analysis.RadianToDegree(arg.get(JointList.leftLeg)!) < 100 && Analysis.RadianToDegree(arg.get(JointList.rightLeg)!) < 100
        if(before == true && this.currentMode == false) {
            this.onResult({
                count: 1,
                score: this.score(this.sit)
            })
            this.stand = new Array()
            this.sit = new Array()
        }
        if(!this.currentMode) {
            this.stand.push(arg)
        }
        else {
            this.sit.push(arg)
        }
    }
    private score(arg: Array<Map<string, number>>): number {
        let left = 4, right = 4
        arg.forEach((element: Map<string, number>) => {
            const tempLeft = element.get(JointList.leftLeg)!
            const tempRight = element.get(JointList.rightLeg)!
            if(left > tempLeft) left = tempLeft
            if(right > tempRight) right = tempRight
        })
        const diff = Math.abs((1.2 - left)) + Math.abs((1.2 - right)) * 50
        return Analysis.maxScore - diff
    }
}