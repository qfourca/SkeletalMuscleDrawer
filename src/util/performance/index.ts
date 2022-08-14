export default class Performance {
    private currentTime: number
    private performance: number
    constructor() {
        this.currentTime = performance.now()
        this.performance = performance.now()
    }
    public getInterval(): number {
        const now = performance.now()
        const result = now - this.currentTime
        this.currentTime = now
        return result
    }
    public start() {
        this.performance = performance.now()
    }
    public end(): number {
        return performance.now() - this.performance
    }
}