import Core from "../core"
import UIRoot from "../interface"
import AnalysisUI from "../interface/analysis"
import ResultModal from "../interface/modal/result"
import Motion from "../motion"
import { exerciseInfo } from "../motion/core/analysis"
import SquartAnalysis from "../motion/core/analysis/squart"
import { Webcam } from "../util"

export default class Analysis {
    constructor (
        
    ) {

    }
    private analysising?: {ui: AnalysisUI, motion: Motion} = undefined
    public onAnalysis(analysis: any) {
        if(analysis.mode == "analysis" && 
            analysis.data != undefined &&
            this.analysising === undefined 
        ) {
            const ui = new AnalysisUI(UIRoot.Root.element)
            UIRoot.Root.appendChild(ui)
            new Webcam(ui.getVideo(), analysis.data.video === "$webcam" ? undefined : URL.createObjectURL(analysis.data.video))
            const squart = new SquartAnalysis(this.onAnalResult.bind(this))
            const motion = new Motion(ui.getVideo(), (result) => {
                squart.input(result.boneRotations)
            })
            this.analysising = {
                ui,
                motion
            }
            this.analysising.ui.setValue(analysis.data.count, analysis.data.goal)
            ui.getVideo().addEventListener('ended', this.forceEnd.bind(this))
        }
        else if(this.analysising != undefined) {
            this.analysising.ui.setValue(analysis.data.count, analysis.data.goal)
        }
    }
    private forceEnd() {
        const get = Core.core.analysis.get()
        UIRoot.Root.appendModal(new ResultModal(UIRoot.Root.getModal(), get.data.count, Math.round(get.data.points / get.data.count * 10) / 10))
    }
    private onAnalResult = (info: exerciseInfo) => {
        const before = Core.core.analysis.get()
        Core.core.analysis.set({
            mode: before.mode,
            data: {
                video: before.data.video,
                goal: before.data.goal,
                count: before.data.count + info.count,
                points: before.data.points + info.score
            }
        })
        const get = Core.core.analysis.get()
        if(get.data.count == get.data.goal) {
            UIRoot.Root.appendModal(new ResultModal(UIRoot.Root.getModal(), get.data.count, Math.round(get.data.points / get.data.count * 10) / 10))
        }
    }
}