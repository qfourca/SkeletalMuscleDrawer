import { 
    GpuBuffer, 
    LandmarkList, 
    NormalizedLandmarkList, 
} from "@mediapipe/pose"
import { Results } from "@mediapipe/pose"

export default class Calculation {
    constructor (
        
    ) {

    }
    public static calculate(result: Results):PoseInfo {
        console.log(result)
        return { 
            ...result 
        }
    }
}

export interface PoseInfo {
    poseLandmarks: NormalizedLandmarkList;
    poseWorldLandmarks: LandmarkList;
    segmentationMask: GpuBuffer;
    image: GpuBuffer;
}