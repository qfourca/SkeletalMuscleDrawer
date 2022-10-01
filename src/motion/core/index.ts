import { Pose, Results } from "@mediapipe/pose"
import Video from "./video"

export default class Core {
    private pose: Pose
    constructor(
        videoElement: HTMLVideoElement,
        onResult:(results: Results) => void | Promise<void>
    ) {
        this.pose = new Pose({locateFile: (file) => {
            return `http://localhost:8080/mediapipe/${file}`;
        }});
        this.pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });
        this.pose.onResults(onResult);
        const video = new Video(
            videoElement,
            async (arg: HTMLVideoElement) => { await this.pose.send({image: arg}) },
        )
    }
}