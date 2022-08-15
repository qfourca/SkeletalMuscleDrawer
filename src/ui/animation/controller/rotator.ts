import { Euler } from "three";
import UIRoot from "../../ui";
export default class Rotator extends UIRoot{
    private target?: Euler
    private axis: string
    private typeInput: HTMLInputElement
    private rangeInput: HTMLInputElement
    constructor(
        parent: HTMLElement,
        target: Euler | undefined,
        axis: string
    ) {
        super(parent)
        this.target = target
        this.axis = axis
        this.element.className = 'rotator'

        this.typeInput = document.createElement('input')
        this.typeInput.type = 'number'
        this.typeInput.addEventListener('input', this.onChange.bind(this))

        this.rangeInput = document.createElement('input')
        this.rangeInput.type = 'range'
        this.rangeInput.min = String(-Math.PI * 2)
        this.rangeInput.max = String(Math.PI * 2)
        this.rangeInput.step = '0.001'
        this.rangeInput.addEventListener('input', this.onChange.bind(this))

        this.append(this.typeInput)
        this.append(this.rangeInput)
    }

    public setTarget(target: Euler | undefined) {
        this.target = target
        if(this.target == undefined) this.set(0)
        else {
            this.set(this.get())
        }
    }
    private onChange(e:any) {
        this.set(e.target.value)
    }
    private get():number {
        if(this.target == undefined) return 0
        else if(this.axis === 'x') return this.target.x
        else if(this.axis === 'y') return this.target.y
        else return this.target.z
    }
    private set(value: number) {
        value = Math.round(value * 1000) / 1000
        if(this.target != undefined) {
            if(this.axis === 'x') this.target.x = value
            else if(this.axis === 'y') this.target.y = value
            else this.target.z = value
        }
        this.rangeInput.value = String(value)
        this.typeInput.value = String(value)
    }
}