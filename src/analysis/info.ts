import { GpuBuffer } from "@mediapipe/pose"
// import { exerciseResult } from "./analysis"
import { AnalysisResult } from "./analysis"
import { exerciseResult } from "./analysis/index"

export interface Setting {
    isWorking: boolean
    videoSrc: string,
    videoElement: HTMLVideoElement,
}
export interface Info {
    buffer: AnalysisResult
    goal: number,
    history: Array<{
        motion: AnalysisResult,
        exercise: exerciseResult
    }>
}