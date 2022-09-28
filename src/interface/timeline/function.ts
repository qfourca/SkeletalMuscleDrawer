import { InterfaceNode } from "../common/types";
//@ts-ignore
import S from '../styles/index.scss'

import IconInfo, * as Icon from "../common/icon";
import { Controller } from "../../state";

export default class FunctionContainer extends InterfaceNode {
    constructor (
        parent: InterfaceNode,
        controller: Controller,
        icons: Array<IconInfo>,
    ) {
        super(parent, 'div', S.FunctionContainer)
        new Time(this, controller)
        new Functions(this, icons)
        new ModeButtonContainer(this, controller)
    }
}

class Functions extends InterfaceNode {
    constructor(
        parent: InterfaceNode,
        icons: Array<IconInfo>
    ) {
        super(parent, 'div', S.Functions)
        icons.forEach((icon: IconInfo) => {
            new Function(this, icon)
        })
    }
}
class Function extends InterfaceNode {
    private icon: IconInfo
    constructor (
        parent: InterfaceNode,
        icon: IconInfo
    ) {
        super(parent, 'div', S.Function)
        this.icon = icon 
        this.rendering()
    }
    public onUpdate(): void {
        
        if(this.icon.reload) {
            this.rendering()
            this.icon.reload = false
        }
    }
    private rendering() {
        this.me.style.backgroundImage = `url('${this.icon.src}')`
        if(this.icon.color != undefined) {
            this.me.style.backgroundColor = `rgba(${this.icon.color}, 1)`
        }
        if(this.icon.onClick != undefined) {
            this.me.addEventListener('click', this.icon.onClick)
        }
    }
}

class ModeButtonContainer extends InterfaceNode {
    constructor (
        parent: InterfaceNode,
        controller: Controller
    ) {
        super(parent, 'div', S.ModeButtonContainer)
        new ModeButton(this, controller)
    }
}
class ModeButton extends InterfaceNode {
    private readonly colorMap:Map<string, string> = new Map([
        ["default", "#FCFFB2"],
        ["analysis", "#C7F2A4"]
    ])
    private controller: Controller
    constructor (
        parent: InterfaceNode,
        controller: Controller
    ) {
        super(parent, 'div', S.ModeButton)
        this.controller = controller
        this.modeChange(controller.getMode())
        this.controller.onModeChange(this.modeChange.bind(this))
        this.me.addEventListener('click', () => {
            if(this.controller.getMode() == "analysis")
                this.controller.setMode("default")
            else if(this.controller.getMode() == "default")
                this.controller.setMode("analysis")
        })
    }
    private modeChange(mode: string) {
        const color = this.colorMap.get(mode)
        if(color != undefined) this.me.style.backgroundColor = color
        this.me.innerText = mode
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