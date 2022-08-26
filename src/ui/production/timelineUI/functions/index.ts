import UIRoot from "../../../ui";
//@ts-ignore
import skipNext from '../../../../static/image/skip_next_white_24dp.svg'
//@ts-ignore
import skipPrevious from '../../../../static/image/skip_previous_white_24dp.svg'
//@ts-ignore
import jumpNext from '../../../../static/image/forward_10_white_24dp.svg'
//@ts-ignore
import jumpPrevious from '../../../../static/image/replay_10_white_24dp.svg'
//@ts-ignore
import fullScreenIcon from '../../../../static/image/fullscreen_white_24dp.svg'
//@ts-ignore
import pause from '../../../../static/image/pause_white_24dp.svg'

import FullScreen from "./FullScreen";
import ClickButton from "./ClickButton";
import Animator from "../../../../animator";
export default class Functions extends UIRoot{
    private static jumpTime: number = 1000
    private skipLeft: ClickButton
    private jumpLeft: ClickButton
    private stop: ClickButton
    private skipRight: ClickButton
    private jumpRight: ClickButton

    private setting: FullScreen
    private fullScreen: FullScreen

    private animator: Animator

    constructor (
        parent: HTMLElement,
        app: HTMLElement,
        animator: Animator
    ) {
        super(parent)
        this.animator = animator
        this.element.className = 'functions'

        this.skipLeft = new ClickButton(this.element, skipPrevious, () => {})
        this.jumpLeft = new ClickButton(this.element, jumpPrevious, () => {this.jump(false)})
        this.stop = new ClickButton(this.element, pause, () => {this.pause()})
        this.jumpRight = new ClickButton(this.element, jumpNext, () => {this.jump(true)})
        this.skipRight = new ClickButton(this.element, skipNext, () => {})

        this.setting = new FullScreen(this.element, fullScreenIcon, app)
        this.fullScreen = new FullScreen(this.element, fullScreenIcon, app)
    }
    private jump(direction: boolean) {
        this.animator.setCurrentTime(this.animator.getCurrentTime() + (direction ? Functions.jumpTime : -Functions.jumpTime))
    }
    private pause() {
        const current = this.animator.togglePause()
        // if(current) this.pauseButton.classList.add('paused')
        // else this.pauseButton.classList.remove('paused')
    }
}