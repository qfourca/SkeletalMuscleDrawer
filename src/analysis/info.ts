import { GpuBuffer } from "@mediapipe/pose"
import { AnalysisResult } from "./analysis"

export interface Setting {
    isWorking: boolean
    videoSrc: string,
    videoElement: HTMLVideoElement,
}
export interface Info {
    buffer: AnalysisResult
    goal: number,
    history: Array<{
            
    }>
}