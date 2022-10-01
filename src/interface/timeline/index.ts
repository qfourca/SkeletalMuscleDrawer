import { Controller } from "../../state";
import { InterfaceNode } from "../common/types";
//@ts-ignore
import S from '../styles/index.scss'
import Progress from './progress'

import IconInfo, * as Icon from "../common/icon";
import FunctionContainer from "./function";
import { FullScreen } from "../../util";
export default class TimeLine extends InterfaceNode {
    private readonly jump: number = 1000
    private icons:Array<IconInfo> =  [
        {
            src: Icon.replay,
            color: "35, 60, 104",
            onClick: this.onReplay.bind(this)
        },
        {
            src: Icon.skip_previous,
            color: "35, 60, 104",
            onClick: () => {}
        },
        {
            src: Icon.pause,
            color: "35, 60, 104",
            onClick: this.onPause.bind(this)
        },
        {
            src: Icon.skip_next,
            color: "35, 60, 104",
            onClick: () => {}
        },
        {
            src: Icon.foward,
            color: "35, 60, 104",
            onClick: this.onForward.bind(this)
        },
        {
            src: Icon.setting,
            color: "35, 60, 104",
            onClick: () => {}
        },
        {
            src: Icon.fullscreen,
            color: "35, 60, 104",
            onClick: this.onFullScreen.bind(this)
        },
    ]
    private fullScreen: FullScreen
    private hide: number = 2000
    constructor (
        parent: InterfaceNode
    ) {
        super(parent, "div", S.TimeLine)
        this.fullScreen = new FullScreen(InterfaceNode.root)
        new Progress(this)
        new FunctionContainer(this, this.icons)
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
                case "Space": this.onPause(); break;
                case "ArrowLeft": this.onReplay(); break;
                case "ArrowRight": this.onForward(); break;
            }
        })
        InterfaceNode.root.addEventListener('mousemove', () => {
            this.hide = 2000
        })
        document.addEventListener('keydown', () => {
            this.hide = 2000
        })
        document.addEventListener('mousedown', () => {
            this.hide = 2000
        })
    }
    public onUpdate(interval: number): void {
        if(this.hide < 0) {
            this.me.classList.add(S.hide)
        }
        else {
            this.me.classList.remove(S.hide)
            this.hide -= interval
        }
    }
    private onPause() {
        const change: boolean = !InterfaceNode.controller.getPaused()
        InterfaceNode.controller.setPaused(change)
    }
    private onReplay() {
        InterfaceNode.controller.jump(-this.jump)
    }
    private onForward() {
        InterfaceNode.controller.jump(this.jump)
    }
    private onFullScreen() {
        if(this.fullScreen.isFullScreen) { 
            this.icons[6].src = Icon.fullscreen
            this.icons[6].reload = true
            this.fullScreen.exit() 
        }
        else { 
            this.icons[6].src = Icon.fullscreen_exit
            this.icons[6].reload = true
            this.fullScreen.full() 
        }
    }
}