import Animation, { Moment } from '../../animation'

export default class TimeLineUI {
    private timeLine: Animation
    private element: HTMLElement
    private width: number
    private maximum: number = 10000
    private times: Array<Time> = new Array()
    private pointer: Pointer
    constructor(
        parent: HTMLElement,
        timeLine: Animation,
        option?: Option
    ) {
        this.timeLine = timeLine
       
        this.element = document.createElement('div')
        this.element.style.width = '100%'
        this.element.style.height = '100px'
        this.element.style.background = 'black'
        this.element.style.position = 'absolute'
        this.element.style.bottom = '0'
        parent.appendChild(this.element)

        this.width = Number(window.getComputedStyle(this.element).width.replace('px', ''))
        document.addEventListener('resize', () => { this.width = Number(window.getComputedStyle(this.element).width.replace('px', '')) })

        this.pointer = new Pointer(this.element)
        this.drawTimeLine()
    }
    public reload() {
        this.drawTimeLine()
    }

    private drawTimeLine() {
        const length = this.timeLine.length
        // console.log(length, this.times.length)
        for (let i = 0; i < length - this.times.length; i++) 
            this.times.push(new Time(this.element))
        this.timeLine.forEach((element: Moment, idx: number) => {
            const { run } = this.timeLine.getTime(idx)
            this.times[idx].move(run / this.maximum * this.width)
        })
    }

    public currentPos(): number {
        return this.pointer.getPosistion() / this.width * this.maximum
    }
}
class Time {
    private element: HTMLDivElement
    private posistion: number = 0
    private parent: HTMLElement
    constructor(
        parent: HTMLElement
    ) {
        this.parent = parent
        this.element = document.createElement('div')
        this.element.style.width = '40px'
        this.element.style.height = '40px'
        this.element.style.borderRadius = '50%'
        this.element.style.position = 'absolute'
        this.element.style.top = '-20px'
        this.element.style.background = 'orange'
        this.parent.appendChild(this.element)
    }
    public move(pos: number) {
        this.posistion = pos
        this.element.style.left = this.posistion + 'px'
    }
    public remove() {
        // this.parent.removeChild(this.element)
    }
}
class Pointer {
    private element: HTMLDivElement
    private posistion: number = 0
    private parent: HTMLElement
    constructor(
        parent: HTMLElement
    ) {
        this.parent = parent
        this.element = document.createElement('div')
        this.element.style.width = '0px'
        this.element.style.height = '0px'
        this.element.style.borderTop = "40px solid #ff0000"
        this.element.style.borderLeft = "20px solid transparent"
        this.element.style.borderRight = "20px solid transparent"
        this.element.style.position = 'absolute'
        this.element.style.zIndex = '100'
        this.element.style.top = '-20px'
        this.element.style.cursor = 'pointer'

        this.element.addEventListener('mousedown', this.drag.bind(this))

        this.move(this.posistion)

        this.parent.appendChild(this.element)
    }
    private drag(event: Event) {
        const mouseMove = (e: MouseEvent) => {
            this.move(this.posistion + e.movementX)
        }
        const mouseUp = (e: Event) => {
            document.removeEventListener('mousemove', mouseMove)
            document.removeEventListener('mouseup', mouseUp)
        }
        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
    }
    public move(pos: number) {
        
        const parentWidth = Number(window.getComputedStyle(this.parent).width.replace('px', ''))
        if(pos <= parentWidth - 40 && pos >= 0) {
            this.posistion = pos
            this.element.style.left = this.posistion + 'px'
        }
        else if(pos > parentWidth - 40) {
            this.posistion = parentWidth - 40
        }
        else if(pos < 0){
            this.posistion = 0
            this.element.style.left = this.posistion + 'px'
        }
            
    }
    public getPosistion(): number {
        return this.posistion
    }
}

export interface Option {
    
}