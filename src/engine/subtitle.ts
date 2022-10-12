import Core from "../core"

export default class Subtitles extends Array<Subtitle> {
    constructor (
        me: Array<Subtitle>
    ) {
        super(...me)
        this.sort((a: Subtitle, b: Subtitle) => a.start - b.start)
        this.forEach((element: Subtitle, idx: number) => {
            if(element.end === undefined) {
                me[idx].end = me[idx + 1].start
            }
        })
        Core.core.currentTime.hang(this.onTimeChange.bind(this))
    }
    private onTimeChange(time: number) {
        this.forEach((element) => {
            if(time >= element.start && time < element.end!) {
                Core.core.subtitle.set(element.content)
            }
        })
    }
}
export interface Subtitle {
    start: number,
    end?: number,
    content: string
}
