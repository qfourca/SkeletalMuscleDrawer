import { 
    GpuBuffer, 
    LandmarkList,
} from "@mediapipe/pose"
import { Results } from "@mediapipe/pose"
import { Euler, Vector2, Vector3 } from "three";
import bones from "../link";

export default class Calculation {
    constructor (
        
    ) {

    }
    public static calculate(result: Results):PoseInfo {
        const { poseWorldLandmarks } = result
        const boneRotations:Map<string, Euler> = new Map()
        bones.forEach(element => {
            const parent = poseWorldLandmarks[element.parent]
            const child = poseWorldLandmarks[element.child]
            const extention = element.origin ? element.origin : new Vector3(0, parent.y + 20, parent.z)
            boneRotations.set(
                element.name,
                new Euler(
                    Calculation.TwoDegree(new Vector2(parent.y, parent.z), new Vector2(child.y, child.z), new Vector2(extention.y, extention.z)),
                    Calculation.TwoDegree(new Vector2(parent.x, parent.z), new Vector2(child.x, child.z), new Vector2(extention.x, extention.z)),
                    Calculation.TwoDegree(new Vector2(parent.y, parent.x), new Vector2(child.y, child.x), new Vector2(extention.y, extention.x))
                )
            )
        })
        return {
            ...result,
            boneRotations
        }
    }

    private static TwoDegree(target: Vector2, standard: Vector2, extention: Vector2): number {
        return Calculation.cha(Math.atan((standard.y - target.y) / (standard.x - target.x)), Math.atan((extention.y - target.y) / (extention.x - target.x)))
    }

    private static cha(a: number, b: number) {
        if(a > b) {
            return a - b
        }
        else {
            return b - a
        }
    }
}

export interface PoseInfo {
    poseWorldLandmarks: LandmarkList;
    boneRotations: Map<string, Euler>;
    segmentationMask: GpuBuffer;
    image: GpuBuffer;
}