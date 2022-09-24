import { Landmark, Results } from '@mediapipe/pose'
import { UpdateAble } from '../../interface';
import Core from './core'
import Graphic from './graphic';
import UIMember from '../../ui/common';
import Calculation, { PoseInfo } from './calculation';
import joints from './joints';
import { Vector3 } from 'three';

//@ts-ignore
import testVideo from '../../static/video/chinning.mp4'
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
        if(results.poseWorldLandmarks != undefined) {
            results.poseWorldLandmarks.forEach((element, idx) => {
                results.poseWorldLandmarks[idx].x *= this.delta
                results.poseWorldLandmarks[idx].y *= this.delta
                results.poseWorldLandmarks[idx].z *= this.delta
            })
            this.graphic.set(results.poseWorldLandmarks)
            const points = results.poseWorldLandmarks
            const joint: Map<string, number> = new Map()
            joints.forEach((element, key) => {
                if((points[element[0]].visibility! + points[element[1]].visibility! + points[element[2]].visibility!) / 3 > 0.8) {
                    joint.set(key, Calculation.ThreeDegree(
                        new Vector3(points[element[0]].x, points[element[0]].y, points[element[0]].z),
                        new Vector3(points[element[1]].x, points[element[1]].y, points[element[1]].z),
                        new Vector3(points[element[2]].x, points[element[2]].y, points[element[2]].z)
                    ))
                }
            })
            this.out({
                ...results,
                boneRotations: joint
            })
        }
    }
    public update() {
        this.graphic.update()
    }
}
export {
    PoseInfo as PoseInfo
}