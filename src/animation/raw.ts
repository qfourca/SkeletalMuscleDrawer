export default interface RawAnimation {
    name: string
    animations: Array<{
        name: string,
        src: string
    }>
    timeline: Array<string>
    subtitles: Array<{
        start: number,
        end: number,
        content: string
    }>
}