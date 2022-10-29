export default class Video {
    private element:HTMLVideoElement
    private onFrame:(video: HTMLVideoElement) => Promise<void>
    private currentTime: number = 0
    constructor(
        video: HTMLVideoElement,
        onFrame:(video: HTMLVideoElement) => Promise<void>
    ) {
        this.onFrame = onFrame
        this.element = video
        this.update()
    }
    update() {
        if(
            this.element.readyState === 4 &&
            this.element.currentTime != this.currentTime
        ) {
            this.onFrame(this.element)
            .then(() => {
                this.currentTime = this.element.currentTime
                requestAnimationFrame(this.update.bind(this))
            })
        }
        else 
            requestAnimationFrame(this.update.bind(this))
    }

}