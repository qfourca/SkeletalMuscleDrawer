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
    private controller: Controller
    private fullScreen: FullScreen
    constructor (
        parent: InterfaceNode,
        controller: Controller,
        root: HTMLElement
    ) {
        super(parent, "div", S.TimeLine)
        this.controller = controller
        this.fullScreen = new FullScreen(root)
        new Progress(this, controller)
        new FunctionContainer(this, this.icons)
        new Time(this, controller)
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
    }
    private onReplay() {
        this.controller.jump(-this.jump)
    }
    private onForward() {
        this.controller.jump(this.jump)
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

class Time extends InterfaceNode{
    private controller: Controller
    constructor (
        parent: InterfaceNode,
        controller: Controller
    ) {
        super(parent, 'div', S.TimeProgress)
        this.me.innerText = "ASD"
        this.controller = controller
    }
    public onUpdate(): void {
        this.me.innerText = `${Time.timeChange(this.controller.getCurrentTime())} / ${Time.timeChange(this.controller.getMaximumTime())}`
    }
    private static timeChange(ms: number): string {
        const seconds = ms / 1000
        let min:string = String(Math.round((seconds%3600) / 60))
        min = (Number(min) < 10 ? "0" : "") + min
        let sec:string = String(Math.round(seconds%60))
        sec = (Number(sec) < 10 ? "0" : "") + sec
        return `${min} : ${sec}`
    }
}