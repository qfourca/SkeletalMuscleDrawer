export default class FullScreen {
    private target: HTMLElement
    public isFullScreen:boolean = false
    constructor(
        target: HTMLElement
    ) {
        this.target = target
    }
    public full() {
        this.isFullScreen = true
        if (this.target.requestFullscreen) this.target.requestFullscreen()
        //@ts-expect-error
        else if (element.webkitRequestFullscreen) return element.webkitRequestFullscreen()
        //@ts-expect-error
        else if (this.target.mozRequestFullScreen) this.target.mozRequestFullScreen()
        //@ts-expect-error
        else if (this.target.msRequestFullscreen) this.target.msRequestFullscreen()
        else return (() => {console.log("No Fullscreen Browser"); this.isFullScreen = false})
    }
    public exit() {
        this.isFullScreen = false
        if (document.exitFullscreen) return document.exitFullscreen()
        //@ts-expect-error
        else if (document.webkitExitFullscreen) return document.webkitExitFullscreen()
        //@ts-expect-error
        else if (document.mozCancelFullScreen) return document.mozCancelFullScreen()
        //@ts-expect-error
        else if (document.msExitFullscreen) return document.msExitFullscreen()
        else return (() => {console.log("No Fullscreen Browser")})
    }
}