import UIRoot from '../../ui'
import Animation from "../../../animation";
//@ts-ignore
import fullScreen from '../../../static/image/fullscreen_white_24dp.svg'
//@ts-ignore
import fullScreenExit from '../../../static/image/fullscreen_exit_white_24dp.svg'
//@ts-ignore
import setting from '../../../static/image/settings_white_24dp.svg'
export default class Right extends UIRoot{
    private fullScreenButton: HTMLElement
    private settingButton: HTMLElement
    private isFullscreen: boolean = false
    private fullScreenFunction: () => any
    private fullScreenExitFunction: () => any
    constructor(
        parent: HTMLElement,
        fullScreenElement: HTMLElement
    ) {
        super(parent)
        this.fullScreenFunction = Right.runFullscreenFunction(fullScreenElement)
        this.fullScreenExitFunction = Right.runExitFullscreenFunction()
        this.element.className = 'right functionContainer'

        this.fullScreenButton = document.createElement('div')
        this.fullScreenButton.className = 'function'
        this.fullScreenButton.style.backgroundImage = `url(${fullScreen})`
        this.fullScreenButton.addEventListener('click', this.fullScreen.bind(this))

        this.settingButton = document.createElement('div')
        this.settingButton.className = 'function setting'
        this.settingButton.style.backgroundImage = `url(${setting})`
        this.settingButton.addEventListener('click', this.setting.bind(this))

        this.element.appendChild(this.fullScreenButton)
        this.element.appendChild(this.settingButton)
    }   
    private fullScreen() {
        this.isFullscreen = !this.isFullscreen
        if(this.isFullscreen) {
            this.fullScreenFunction()
            this.fullScreenButton.style.backgroundImage = `url(${fullScreenExit})`
        }
        else {
            this.fullScreenExitFunction()
            this.fullScreenButton.style.backgroundImage = `url(${fullScreen})`
        }
    }
    private setting() {
        console.log("setting")
    }
    public update() {

    }

    private static runFullscreenFunction(element: any):() => any {
        if (element.requestFullscreen) return element.requestFullscreen.bind(element)
        else if (element.webkitRequestFullscreen) return element.webkitRequestFullscreen.bind(element)
        else if (element.mozRequestFullScreen) return element.mozRequestFullScreen.bind(element)
        else if (element.msRequestFullscreen) return element.msRequestFullscreen.bind(element)
        else return (() => {console.log("No Fullscreen Browser")})
    }
    private static runExitFullscreenFunction() {
        if (document.exitFullscreen) return document.exitFullscreen.bind(document)
        //@ts-expect-error
        else if (document.webkitExitFullscreen) return document.webkitExitFullscreen.bind(document)
        //@ts-expect-error
        else if (document.mozCancelFullScreen) return document.mozCancelFullScreen.bind(document)
        //@ts-expect-error
        else if (document.msExitFullscreen) return document.msExitFullscreen.bind(document)
        else return (() => {console.log("No Fullscreen Browser")})
    }
}