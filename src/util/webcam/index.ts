export default class Webcam {
    constructor (
        video: HTMLVideoElement,
        src?: string
    ) {

        if(src == undefined) {
            if(navigator.mediaDevices == undefined) {
                alert("Can't use Webcam")
            }
            else {
                navigator.mediaDevices.getUserMedia({
                    video: { 
                        width: { ideal: 1920 }, 
                        height: { ideal: 1080 }
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