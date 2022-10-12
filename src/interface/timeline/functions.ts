import Core from "../../core";
import IconInfo, * as Icon from "./icon";
import Component from "../interface/component";
//@ts-ignore
import S from './style.scss'
import { FullScreen } from "../../util";
export default class Functions extends Component {
    private jump: number = 1000
    private fullScreen: FullScreen
    private icons:Array<IconInfo> =  [
        {
            src: Icon.replay,
            onClick: this.onReplay.bind(this),
            bind: ["ArrowLeft"]
        },
        {
            src: Icon.skip_previous,
            onClick: () => {}
        },
        {
            src: Icon.pause,
            onClick: this.onPause.bind(this),
            bind: [" "]
        },
        {
            src: Icon.skip_next,
            onClick: () => {}
        },
        {
            src: Icon.foward,
            onClick: this.onFoward.bind(this),
            bind: ["ArrowRight"]
        },
        {
            src: Icon.setting,
            onClick: () => {}
        },
        {
            src: Icon.fullscreen,
            onClick: this.onFullScreen.bind(this)
        },
    ]
    protected html: string = ``
    private bindList: Map<string, (e: any) => void> = new Map()
    constructor (
        parent: Element
    ) {
        super(parent)
        this.fullScreen = new FullScreen(Component.root)
        this.render()
        this.icons.forEach((icon: IconInfo) => {
            const element = document.createElement('div')
            element.className = S.Function
            element.style.backgroundImage = `url(${icon.src})`
            element.addEventListener('click', icon.onClick)
            if(icon.bind != undefined)
            icon.bind.forEach((key: string) => {
                this.bindList.set(key, icon.onClick)
            })
            parent.appendChild(element)
        })
        document.addEventListener('keydown', (e) => {
            const get = this.bindList.get(e.key)
            if(get != undefined) {
                e.preventDefault()
                get(e)
            }
        })
    }
    private onPause() {
        Core.core.isRunning.set(!Core.core.isRunning.get())
    }
    private onReplay() {
        Core.core.setTime(Core.core.currentTime.get() - this.jump)
    }
    private onFoward() {
        Core.core.setTime(Core.core.currentTime.get() + this.jump)
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