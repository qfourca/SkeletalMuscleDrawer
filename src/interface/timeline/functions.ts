import App from "../../app/app";
import Component from "../package/component";
import S from './style.scss'
import * as Icons from './functions.icons'
import Hook from "../../hook";
import { FullScreen } from "../../util";

export default class Functions extends Component {
    protected html: string = `
        <div class="${S.functionContainer}">
        </div>
    `
    private fullScreen: FullScreen
    private isFullScreen: Hook<boolean>
    private functions: Array<FunctionInfo> = [
        {
            icon: new Hook(Icons.replay),
            onClick: this.jumpBackward.bind(this),
            keybind: ["ArrowLeft"]
        },
        {
            icon: new Hook(Icons.skip_previous),
            onClick: () => {},
            keybind: []
        },
        {
            icon: new Hook(Icons.pause),
            onClick: this.togglePause.bind(this),
            keybind: ["Space"]
        },
        {
            icon: new Hook(Icons.skip_next),
            onClick: () => {},
            keybind: []
        },
        {
            icon: new Hook(Icons.foward),
            onClick: this.jumpForward.bind(this),
            keybind: ["ArrowRight"]
        },
        {
            icon: new Hook(Icons.setting),
            onClick: () => {},
            keybind: []
        },
        {
            icon: new Hook(Icons.fullscreen),
            onClick: this.toggleFullScreen.bind(this),
            keybind: []
        },
    ]
    private keyBind: Map<string, () => void> = new Map()
    private jumpTime: number = 5000
    private pauseIndex = 2
    private fullScreenIndex = 6
    constructor (
        app: App,
        parent: HTMLElement
    ) {
        super(app, parent)
        this.fullScreen = new FullScreen(app.rootElement.get())
        this.isFullScreen = new Hook(this.fullScreen.isFullScreen)
        this.render()
        const container = this.getAsClassName(S.functionContainer)
        this.functions.forEach((functionInfo: FunctionInfo, idx: number) => {
            new Function(app, container, functionInfo, idx)
            functionInfo.keybind.forEach((code: string) => {
                this.keyBind.set(code, functionInfo.onClick)
            })
        })
        document.addEventListener('keydown', this.onKeyDown.bind(this))

        this.app.isPaused.hang(this.onPauseChange.bind(this))
        this.isFullScreen.hang(this.onFullScreenChange.bind(this))
    }
    private onKeyDown(e: KeyboardEvent) {
        const ketfunc = this.keyBind.get(e.code)
        if(ketfunc != undefined) ketfunc()
    }
    private togglePause() {
        this.app.isPaused.set(!this.app.isPaused.get())
    }
    private toggleFullScreen() {
        if(this.fullScreen.isFullScreen) this.fullScreen.exit() 
        else this.fullScreen.full()
        this.isFullScreen.set(this.fullScreen.isFullScreen)
    }
    private jumpForward() {
        this.app.currentTime.set(this.app.currentTime.get() + this.jumpTime)
    }
    private jumpBackward() {
        this.app.currentTime.set(this.app.currentTime.get() - this.jumpTime)
    }
    private onPauseChange(pause: boolean) {
        this.functions.at(this.pauseIndex)?.icon.set(pause ? Icons.play : Icons.pause)
    }
    private onFullScreenChange(fullScreen: boolean) {
        this.functions.at(this.fullScreenIndex)?.icon.set(fullScreen ? Icons.fullscreen_exit : Icons.fullscreen)
    }
}
class Function extends Component {
    private idx: number
    constructor (
        app: App,
        parent: HTMLElement,
        info: FunctionInfo,
        idx: number
    ) {
        super(app, parent)
        this.idx = idx
        this.render(`
            <div class="${S.function + ' ' + this.idx}">
                <img src=${info.icon.get()}></img> 
            </div>
        `)
        this.getAsClassName(S.function).addEventListener('click', info.onClick)
        info.icon.hang(this.changeIcon.bind(this))
    }
    private getImageELement(): HTMLImageElement {
        //@ts-ignore
        return this.getAsClassName(S.function).children[0]
    }
    public changeIcon(icon: string) {
        this.getImageELement().src = icon
    }
    public getAsClassName(className: string): HTMLElement {
        //@ts-ignore
        return this.parent.getElementsByClassName(className + ' ' + String(this.idx))[0]
    }
}
interface FunctionInfo {
    icon: Hook<string>,
    onClick: () => void
    keybind: Array<string>
}