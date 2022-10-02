export default class Webcam {
    constructor (
        video: HTMLVideoElement,
        src?: string
    ) {
        video.autoplay = true
        video.muted = true
        video.playsInline = true
        video.controls = true
        video.style.width = "360px";
        if(src == undefined) {
            if(navigator.mediaDevices == undefined) {
                alert("Can't use Webcam")
            }
            else {
                navigator.mediaDevices.getUserMedia({
                    video: { 
                        width: { ideal: 1080 }, 
                        height: { ideal: 1920 }
                    }, 
                    audio: false,
                }).then((stream) => {
                    video.srcObject = stream;
                }).catch((err) => {
                    alert("No Webcam permission")
                })
            }
        }
        else {
            video.src = src
        }

    }
}