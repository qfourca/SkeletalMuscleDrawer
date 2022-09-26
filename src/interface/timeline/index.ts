import { Controller } from "../../state";
import { InterfaceNode } from "../common/types";
//@ts-ignore
import S from '../styles/index.scss'
import Progress from './progress'

import IconInfo, * as Icon from "../common/icon";
import FunctionContainer from "./function";
export default class TimeLine extends InterfaceNode {
    private readonly jump: number = 1000
    private icons:Array<IconInfo> =  [
        {
            src: Icon.replay,
            color: "200, 0, 0",
            onClick: this.onReplay.bind(this)
        },
        {
            src: Icon.skip_previous,
            color: "200, 100, 0",
            onClick: () => {}
        },
        {
            src: Icon.pause,
            color: "200, 200, 0",
            onClick: this.onPause.bind(this)
        },
        {
            src: Icon.skip_next,
            color: "100, 200, 0",
            onClick: () => {}
        },
        {
            src: Icon.foward,
            color: "0, 100, 200",
            onClick: this.onForward.bind(this)
        },
        {
            src: Icon.setting,
            color: "0, 0, 200",
            onClick: () => {}
        },
        {
            src: Icon.fullscreen,
            color: "100, 0, 200",
            onClick: () => {}
        },
    ]
    private controller: Controller
    constructor (
        parent: InterfaceNode,
        controller: Controller
    ) {
        super(parent, "div", S.TimeLine)
        this.controller = controller
        new Progress(this, controller)
        new FunctionContainer(this, this.icons)
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case "Space": this.onPause(); break;
                case "ArrowLeft": this.onReplay(); break;
                case "ArrowRight": this.onForward(); break;
            }
        })
    }
    private onPause() {
        const change: boolean = !this.controller.getPaused()
        this.controller.setPaused(change)
        // this.icons[2].src = Icon.replay
        // this.icons[2].reload = true
    }
    private onReplay() {
        this.controller.jump(-this.jump)
    }
    private onForward() {
        this.controller.jump(this.jump)
    }
}

class controllerWrapper {
    private controller: Controller
    constructor(controller: Controller) {
        this.controller = controller
    }
    public togglePause(): boolean {
        const change: boolean = !this.controller.getPaused()
        this.controller.setPaused(change)
        return change
    }
}