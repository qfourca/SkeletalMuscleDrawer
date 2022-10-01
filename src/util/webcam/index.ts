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
            navigator.mediaDevices.getUserMedia({
                video: { 
                    width: { ideal: 1920 }, 
                    height: { ideal: 1080 }
                }, 
                audio: false,
            }).then((stream) => {
                video.srcObject = stream;
            }).catch((error) => {
                alert("Can't use Webcam")
                console.log(error)
            })
        }
        else {
            video.src = src
        }

    }
}