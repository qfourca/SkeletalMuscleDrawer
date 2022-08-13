import UIRoot from '../../ui'
import Animation from "../../../animation";
//@ts-ignore
import skipNext from '../../../static/image/skip_next_white_24dp.svg'
//@ts-ignore
import skipPrevious from '../../../static/image/skip_previous_white_24dp.svg'


export default class Left extends UIRoot{
    private animation: Animation
    private pauseButton: HTMLElement
    private leftSkipButton: HTMLElement
    private rightSkipButton: HTMLElement
    constructor(
        parent: HTMLElement,
        animation: Animation
    ) {
        super(parent)
        // console.log("ASD")
        this.animation = animation
        this.element.className = 'left functionContainer'

        this.pauseButton = document.createElement('div')
        this.pauseButton.className = 'pauseAndStart paused'
        this.pauseButton.addEventListener('click', this.pause.bind(this))
        this.leftSkipButton = document.createElement('div')
        this.leftSkipButton.className = 'skipButton'
        this.leftSkipButton.style.backgroundImage = `url(${skipPrevious})`
        this.rightSkipButton = document.createElement('div')
        this.rightSkipButton.className = 'skipButton'
        this.rightSkipButton.style.backgroundImage = `url(${skipNext})`

        this.element.appendChild(this.leftSkipButton)
        this.element.appendChild(this.pauseButton)
        this.element.appendChild(this.rightSkipButton)

        document.addEventListener('keydown', (e) => {
            if(e.code === "Space") this.pause()
        })
    }   
    private pause() {
        const current = this.animation.togglePause()
        if(current) this.pauseButton.classList.add('paused')
        else this.pauseButton.classList.remove('paused')
    }
    private skip() {

    }
    private jump() {

    }
    public update() {

    }
}