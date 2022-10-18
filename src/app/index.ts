import Core from '../core'
import Engine from '../engine'
import { UpdateAble } from './update'
import Three from '../three'
import UIRoot from '../interface'
import Motion from '../motion'
import { rawAnimation } from '../engine/animator'
import { Webcam } from '../util'
//@ts-ignore
// import oneStar from '../static/video/oneStar.mp4'
import AnalysisUI from '../interface/analysis'
import SquartAnalysis from '../motion/core/analysis/squart'
import { exerciseInfo } from '../motion/core/analysis'
import ResultModal from '../interface/modal/result'
import Analysis from '../analysis'

export default class App extends Core {
    constructor (
        root: HTMLElement,
        human: string,
        animation: rawAnimation | string,
        world: string
    ) {
        const three = new Three(root)
        super(root, three.getScene())

        this.patchTask(three)
        this.patchTask(new Engine(human, animation, world))
        this.patchTask(new UIRoot(root))
        
        Core.core.mapLoading.hang(this.wait.bind(this))
        Core.core.analysis.hang(this.onAnalysis.bind(this))
    }
    private Analysis: Analysis = new Analysis()
    private wait(state: number) {
        if(state === 100) {
            this.patchTask(new TimeController())
            Core.core.isRunning.set(true)
        }
    }
    private onAnalysis = this.Analysis.onAnalysis.bind(this.Analysis)
}
class TimeController implements UpdateAble {
    public update(interval: number) {
        if(Core.core.isRunning.get())
            Core.core.setTime(Core.core.currentTime.get() + interval)
    }
}