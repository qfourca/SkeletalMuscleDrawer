import { GpuBuffer, LandmarkList } from "@mediapipe/pose";
import { Euler, Vector2, Vector3 } from "three";
import { PerspectiveCamera } from "three";

export default class Calculation {
    constructor (
        
    ) {

    }
    public static createVector(x: number, y: number, z: number, camera: PerspectiveCamera) {
        const p = new Vector3(x, y, z);
        const vector = p.project(camera);
        return vector
    }
    public static TwoDegree(target: Vector2, standard: Vector2, extention: Vector2): number {
        const result = (Math.atan2(
            standard.y - target.y, 
            standard.x - target.x
        ) - 
        Math.atan2(
            extention.y - target.y, 
            extention.x - target.x
        ))
        return result >= 0 ? result : Math.PI / 2 - result
    }
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
    public static isMiddle(target: number, other1: number, other2: number): boolean {
        return (target > other1 && target < other2) || (target > other2 && target < other1)
    }

    public static cha(a: number, b: number) {
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
    boneRotations: Map<string, number>;
    segmentationMask: GpuBuffer;
    image: GpuBuffer;
}