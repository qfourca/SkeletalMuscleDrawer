import { GpuBuffer, LandmarkList, NormalizedLandmarkList, Results } from "@mediapipe/pose";
import { AnalysisSetting } from ".";
import Member from "../app/member";
import App from "../app/app";
import Motion from './motion/motion'
import { Vector3 } from "three";
export default class Analysis extends Member {
    public static Joints = new Map([
        ["leftArm", [11, 13, 15]],
        ["rightArm", [12, 14, 16]],
        ["leftLeg", [23, 25, 27]],
        ["rightLeg", [24, 26, 28]],
        ["leftHipY", [25, 23, 24]],
        ["rightHipY", [26, 24, 23]],
        ["leftHipX", [11, 23, 25]],
        ["rightHipX", [12, 24, 26]],
        ["leftShoulderX", [13, 11, 23]],
        ["rightShoulderX", [14, 12, 24]],
        ["leftShoulderY", [13, 11, 12]],
        ["rightShoulderY", [14, 12, 11]],
    ])
    public static ThreeDegree(a: Vector3, b: Vector3, c: Vector3) {
        const ab = [b.x - a.x, b.y - a.y, b.z - a.z]
        const bc = [c.x - b.x, c.y - b.y, c.z - b.z]
        const abVec = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2]);
        const bcVec = Math.sqrt(bc[0] * bc[0] + bc[1] * bc[1] + bc[2] * bc[2]);
        const abNorm = [ab[0] / abVec, ab[1] / abVec, ab[2] / abVec]
        const bcNorm = [bc[0] / bcVec, bc[1] / bcVec, bc[2] / bcVec]
        const res = abNorm[0] * bcNorm[0] + abNorm[1] * bcNorm[1] + abNorm[2] * bcNorm[2];
        return Math.PI - Math.acos(res)
    }
    private motion?: Motion
    constructor (
        app: App
    ) {
        super(app)
        this.app.analysisSetting.hang(this.onAnalysisChange.bind(this))
    }
    private onAnalysisChange(info: AnalysisSetting) {
        if(this.motion == undefined) {
            this.motion = new Motion(info.videoElement ,this.onMotionResult.bind(this))
        }
        if(info.isWorking) { 
            this.motion.enable = true
        }
        else {
            this.motion.enable = false
        }
    }
    private onMotionResult(result: Results) {
        const angles = new Map()
        Analysis.Joints.forEach((points: Array<number>, name: string) => {
            if(result.poseWorldLandmarks != undefined) {
                const fir = result.poseWorldLandmarks[points[0]]
                const sec = result.poseWorldLandmarks[points[1]]
                const trd = result.poseWorldLandmarks[points[2]]
                angles.set(
                    name,
                    {
                        name: name,
                        accuracy: (
                            (fir.visibility ?? 0) + 
                            (sec.visibility ?? 0) + 
                            (trd.visibility ?? 0)
                        ) / 3,
                        value: Analysis.ThreeDegree(
                            new Vector3(fir.x, fir.y, fir.z),
                            new Vector3(sec.x, sec.y, sec.z),
                            new Vector3(trd.x, trd.y, trd.z)
                        )
                    }
                )
            }
        })
        const temp = { ...this.app.analysisData.get() }
        temp.buffer = {
            poseWorldLandmarks: result.poseWorldLandmarks,
            poseAngles: angles,
            image: result.image
        }
        this.app.analysisData.set(temp)
    }
}


export interface AnalysisResult {
    poseWorldLandmarks: LandmarkList;
    poseAngles: Map<string, {
        name: string,
        accuracy: number,
        value: number
    }>;
    image: GpuBuffer;
}