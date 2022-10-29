export default interface Info {
    isWorking: boolean
    videoSrc: string,
    videoElement: HTMLVideoElement,
    data: {
        goal: number,
        history: Array<{
            
        }>
    }
}