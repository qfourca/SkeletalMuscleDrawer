import { Results } from '@mediapipe/pose'
import { UpdateAble } from '../../interface';
import Core from './core'
import Graphic from './graphic';
import UIMember from '../../ui/common';

//@ts-ignore
import testVideo from '../../static/video/left.mp4'

export default class App implements UpdateAble{
    private parent: HTMLElement
    private core: Core
    private graphic: Graphic
    constructor(
        parent: HTMLElement
    ) {
        const ui = new UIMember(parent, 'div', "skeletalmuscle-drawer-motion-root")
        this.parent = ui.me
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
    private onResult(results: Results) {
        this.graphic.set(results.poseWorldLandmarks)
    }
    public update() {
        this.graphic.update()
    }
}