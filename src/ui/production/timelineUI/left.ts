import UIRoot from '../../ui'
import Animation from "../../../animation";

//@ts-ignore
import skipNext from '../../../static/image/skip_next_white_24dp.svg'
//@ts-ignore
import skipPrevious from '../../../static/image/skip_previous_white_24dp.svg'
//@ts-ignore
import jumpNext from '../../../static/image/forward_10_white_24dp.svg'
//@ts-ignore
import jumpPrevious from '../../../static/image/replay_10_white_24dp.svg'


export default class Left extends UIRoot{
    private jumpTime: number = 1000
    private animation: Animation
    private time: HTMLElement
    private pauseButton: HTMLElement
    private pauseButtonContainer: HTMLElement
    private leftSkipButton: HTMLElement
    private rightSkipButton: HTMLElement
    private leftJumpButton: HTMLElement
    private rightJumpButton: HTMLElement
    constructor(
        parent: HTMLElement,
        animation: Animation
    ) {
        super(parent)
        this.animation = animation
        this.element.className = 'left functionContainer'

        this.pauseButtonContainer = document.createElement('div')
        this.pauseButtonContainer.className = "pauseContainer function"

        this.pauseButton = document.createElement('div')
        this.pauseButton.className = 'pauseAndStart paused'
        this.pauseButton.addEventListener('click', this.pause.bind(this))
        this.pauseButtonContainer.appendChild(this.pauseButton)

        this.leftSkipButton = document.createElement('div')
        this.leftSkipButton.className = 'function'
        this.leftSkipButton.style.backgroundImage = `url(${skipPrevious})`
        this.rightSkipButton = document.createElement('div')
        this.rightSkipButton.className = 'function'
        this.rightSkipButton.style.backgroundImage = `url(${skipNext})`
        
        this.rightJumpButton = document.createElement('div')
        this.rightJumpButton.className = 'function'
        this.rightJumpButton.style.backgroundImage = `url(${jumpNext})`
        this.rightJumpButton.addEventListener('click', () => {this.jump(true)})
        this.leftJumpButton = document.createElement('div')
        this.leftJumpButton.className = 'function'
        this.leftJumpButton.style.backgroundImage = `url(${jumpPrevious})`
        this.leftJumpButton.addEventListener('click', () => {this.jump(false)})

        this.time = document.createElement('div')
        this.time.className = "time"


        this.element.appendChild(this.leftSkipButton)
        this.element.appendChild(this.leftJumpButton)
        this.element.appendChild(this.pauseButtonContainer)
        this.element.appendChild(this.rightJumpButton)
        this.element.appendChild(this.rightSkipButton)
        this.element.appendChild(this.time)

        document.addEventListener('keydown', (e) => {
            if(e.code === "Space") this.pause()
            else if(e.code === "ArrowRight") this.jump(true)
            else if(e.code === "ArrowLeft") this.jump(false)
        })
    }   
    private msToTime(duration: number) {
        let seconds = Math.floor((duration/1000)%60)
        let minutes = Math.floor((duration/(1000*60)))
        let minuteStr = (minutes < 10) ? '0' + minutes : minutes;
        let secondStr = (seconds < 10) ? '0' + seconds : seconds;
        return minuteStr + "  :  " + secondStr
    }
    private pause() {
        const current = this.animation.togglePause()
        if(current) this.pauseButton.classList.add('paused')
        else this.pauseButton.classList.remove('paused')
    }
    
    private skip(direction: boolean) {

    }
    
    private jump(direction: boolean) {
        this.animation.setCurrentTime(this.animation.getCurrentTime() + (direction ? this.jumpTime : -this.jumpTime))
    }
    public update() {
        this.time.innerText = this.msToTime(this.animation.getCurrentTime())

    }
}