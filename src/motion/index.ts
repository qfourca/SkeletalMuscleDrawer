import { Landmark, Results } from '@mediapipe/pose'
import Core from './core'
import Graphic from './graphic';
import Calculation, { PoseInfo } from './calculation';
import joints from './joints';
import { Vector3 } from 'three';
import { Scene } from '../three';
export default class Motion {
    private core: Core
    private graphic: Graphic
    private delta: number = -1
    constructor(
        video: HTMLVideoElement,
        scene: Scene,
        onResult: (poseInfo: PoseInfo) => void
    ) {
        this.core = new Core(
            video,
            this.onResult.bind(this)
        )
        this.graphic = new Graphic(
            scene
        )
        this.out = onResult
    }
    private out: (poseInfo: PoseInfo) => void = () => {

    }
    private onResult(results: Results) {
        if(results.poseWorldLandmarks != undefined) {
            results.poseWorldLandmarks.forEach((element, idx) => {
                results.poseWorldLandmarks[idx].x = results.poseWorldLandmarks[idx].x * this.delta + 1
                results.poseWorldLandmarks[idx].y *= this.delta
                results.poseWorldLandmarks[idx].z *= this.delta
            })
            this.graphic.set(results.poseWorldLandmarks)
            const points = results.poseWorldLandmarks
            const joint: Map<string, number> = new Map()
            joints.forEach((element, key) => {
                if((points[element[0]].visibility! + points[element[1]].visibility! + points[element[2]].visibility!) / 3 > 0.8) {
                    joint.set(key, Calculation.ThreeDegree(
                        new Vector3(points[element[0]].x, points[element[0]].y, points[element[0]].z),
                        new Vector3(points[element[1]].x, points[element[1]].y, points[element[1]].z),
                        new Vector3(points[element[2]].x, points[element[2]].y, points[element[2]].z)
                    ))
                }
            })
            this.out({
                ...results,
                boneRotations: joint
            })
        }
    }
}
export {
    PoseInfo as PoseInfo
}
export class JointList {
    public static readonly leftArm = "leftArm"
    public static readonly rightArm = "rightArm"
    public static readonly leftLeg = "leftLeg"
    public static readonly rightLeg = "rightLeg"
    public static readonly leftHipY = "leftHipY"
    public static readonly rightHipY = "rightHipY"
    public static readonly leftHipX = "leftHipX"
    public static readonly rightHipX = "rightHipX"
    public static readonly leftShoulderX = "leftShoulderX"
    public static readonly rightShoulderX = "rightShoulderX"
    public static readonly leftShoulderY = "leftShoulderY"
    public static readonly rightShoulderY = "rightShoulderY"
}