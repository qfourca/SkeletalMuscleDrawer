import Core from '../core'
import Engine from '../engine'
import { UpdateAble } from './update'
import Three from '../three'
import UIRoot from '../interface'
import Motion from '../motion'
import { rawAnimation } from '../engine/animator'
import { Webcam } from '../util'
//@ts-ignore
import oneStar from '../static/video/oneStar.mp4'
import AnalysisUI from '../interface/analysis'
import SquartAnalysis from '../motion/core/analysis/squart'
import { exerciseInfo } from '../motion/core/analysis'
import ResultModal from '../interface/modal/result'
import { type } from 'os'
import axios from 'axios'
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
    private wait(state: number) {
        if(state === 100) {
            this.patchTask(new TimeController())
            Core.core.isRunning.set(true)
        }
    }
    private analysising?: {ui: AnalysisUI, motion: Motion} = undefined
    private onAnalysis(analysis: any) {
        if(analysis.mode == "analysis" && 
            analysis.data != undefined &&
            this.analysising === undefined 
        ) {
            const ui = new AnalysisUI(UIRoot.Root.element)
            UIRoot.Root.appendChild(ui)
            new Webcam(ui.getVideo(), oneStar)
            const squart = new SquartAnalysis(this.onAnalResult.bind(this))
            const motion = new Motion(ui.getVideo(), (result) => {
                squart.input(result.boneRotations)
            })
            this.analysising = {
                ui,
                motion
            }
            this.analysising.ui.setValue(analysis.data.count, analysis.data.goal)
        }
        else if(this.analysising != undefined) {
            this.analysising.ui.setValue(analysis.data.count, analysis.data.goal)
        }
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
class TimeController implements UpdateAble {
    public update(interval: number) {
        if(Core.core.isRunning.get())
            Core.core.setTime(Core.core.currentTime.get() + interval)
    }
}