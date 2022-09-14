import { Pose, Results } from "@mediapipe/pose"
import Video from "./video"

export default class Core {
    private parent: HTMLElement
    private pose: Pose
    constructor(
        parent: HTMLElement,
        onResult:(results: Results) => void | Promise<void>,
        videoSrc?: string 
    ) {
        this.parent = parent

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
            this.parent,
            async (arg: HTMLVideoElement) => { await this.pose.send({image: arg}) },
            videoSrc
        )
    }
}