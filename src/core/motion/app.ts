import { Results } from '@mediapipe/pose'
import { UpdateAble } from '../../interface';
import Core from './core'
import Graphic from './graphic';
import UIMember from '../../ui/common';

//@ts-ignore
import testVideo from '../../static/video/front.mp4'
import Calculation, { PoseInfo } from './calculation';
import boneInfos from './link'
export default class App implements UpdateAble{
    private parent: HTMLElement
    private core: Core
    private graphic: Graphic
    private delta: number = -100
    constructor(
        parent: HTMLElement,
        onResult: (poseInfo: PoseInfo) => void
    ) {
        const ui = new UIMember(parent, 'div', "skeletalmuscle-drawer-motion-root")
        this.parent = ui.me
        this.out = onResult
        ui.render()
        this.core = new Core(
            this.parent,
            this.onResult.bind(this),
            testVideo
        )
        const three = document.createElement('div')
        three.style.width = '360px'
        three.style.height = 'calc(100% - 360px)'

        this.parent.appendChild(three)
        this.graphic = new Graphic(
            three
        )
    }
    private out: (poseInfo: PoseInfo) => void
    private onResult(results: Results) {
        results.poseWorldLandmarks.forEach((element, idx) => {
            results.poseWorldLandmarks[idx].x *= this.delta
            results.poseWorldLandmarks[idx].y *= this.delta
            results.poseWorldLandmarks[idx].z *= this.delta
            const temp = results.poseWorldLandmarks[idx].x
            results.poseWorldLandmarks[idx].x = results.poseWorldLandmarks[idx].y
            results.poseWorldLandmarks[idx].y = temp
        })
        this.graphic.set(results.poseWorldLandmarks)
        this.out(Calculation.calculate(results))
    }
    public update() {
        this.graphic.update()
    }
}

export {
    PoseInfo as PoseInfo
}