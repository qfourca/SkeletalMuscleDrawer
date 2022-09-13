export default class Webcam {
    constructor (
        video: HTMLVideoElement
    ) {
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
}