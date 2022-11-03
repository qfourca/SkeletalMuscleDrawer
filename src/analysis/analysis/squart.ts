import JointList from "./jointList";
import Posture from "./analysis";

export default class SquartPosture extends Posture {
    protected accuracy: number = 0.9
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
        this.currentMode = Posture.RadianToDegree(arg.get(JointList.leftLeg)!) < 120 && Posture.RadianToDegree(arg.get(JointList.rightLeg)!) < 120
        if(before == true && this.currentMode == false) {
            const temp = this.sit
            this.stand = new Array()
            this.sit = new Array()
            return {
                score: this.score(temp),
                deductions: new Array()
            }
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
        const diff = Math.abs((1.1 - left)) + Math.abs((1.1 - right)) * 50
        return Posture.maxScore - diff
    }
}