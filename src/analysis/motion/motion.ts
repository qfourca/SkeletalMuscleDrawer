import { Pose, Results } from "@mediapipe/pose"
import Video from "./video"

export default class Motion {
    private pose: Pose
    public enable: boolean = false
    constructor(
        videoElement: HTMLVideoElement,
        onResult:(results: Results) => void | Promise<void>
    ) {
        this.pose = new Pose({locateFile: (file) => {
            return `/mediapipe/${file}`;
        }});
        this.pose.setOptions({
            modelComplexity: 0,
            smoothLandmarks: true,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });
        this.pose.onResults(onResult);
        const video = new Video(
            videoElement,
            async (arg: HTMLVideoElement) => { if(this.enable){ await this.pose.send({image: arg}) }},
        )
    }
}