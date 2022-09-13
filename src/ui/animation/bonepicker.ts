import { Euler } from "three"
import { AppManager } from "../../app"
import { Moment } from "../../core/animation"
import Human from "../../core/human"
import UIMember from "../common"

export default class BonePicker extends UIMember {
    private static readonly Directions: Array<string> = [
        "x",
        "y",
        "z"
    ]
    private moment: Moment = { postures: new Map(), time: 0 }
    private appManager: AppManager
    private boneSeletor: BoneSelectContainer
    private boneRotators: Map<string, BoneRotatorContainer> = new Map()
    private boneName?: string 
    constructor (
        parent: HTMLElement,
        appManager: AppManager
    ) {
        super(parent, 'div', BonePicker.name)
        this.appManager = appManager
        this.boneSeletor = new BoneSelectContainer(this.me)
        this.appendChild(this.boneSeletor)
        BonePicker.Directions.forEach((dir: string) => {
            const rotator = new BoneRotatorContainer(this.me)
            this.appendChild(rotator)
            this.boneRotators.set(dir, rotator)
        })
        this.appManager.eventManager.add('human-load', (human: Human) => {
            this.boneSeletor.setOptions(human.getBoneNames())
        })
        this.appManager.eventManager.add('moment-change', (moment: Moment) => { 
            this.moment = moment
        })
    }
    private static changeEuler(euler: Euler, x: number, y: number, z: number, order?: string) {
        //@ts-ignore
        euler._x = x
        //@ts-ignore
        euler._y = y
        //@ts-ignore
        euler._z = z
        //@ts-ignore
        euler._order = order
    }
    protected onUpdate: (interval: number) => void = () => {
        const boneName = this.boneSeletor.getPickedBone()
        if(this.boneName != boneName) {
            this.boneName = boneName
            if(this.boneName != undefined) {
                const first = this.appManager.animation?.finder.getRootPosture(
                    this.appManager.animation?.finder.getTimeToIndex(this.moment.time)!, 
                    this.boneName
                )
                //@ts-ignore
                this.boneRotators.get('x')!.setValue(first!._x),
                //@ts-ignore
                this.boneRotators.get('y')!.setValue(first!._y),
                //@ts-ignore
                this.boneRotators.get('z')!.setValue(first!._z)
            }
            
        }
        if(this.boneName != undefined) {
            this.boneSetter(this.boneName, new Euler(
                this.boneRotators.get('x')!.getValue(),
                this.boneRotators.get('y')!.getValue(),
                this.boneRotators.get('z')!.getValue()
            ))
        }
    }
    private boneSetter(boneName: string, euler: Euler) {
        if(this.moment.postures.has(boneName)) {
            BonePicker.changeEuler(
                this.moment.postures.get(boneName)!,
                euler.x,
                euler.y,
                euler.z
            )
        }
        else {
            this.moment.postures.set(boneName,
                new Euler(
                    euler.x,
                    euler.y,
                    euler.z
                )
            )
        }
    }
}

class BoneSelectContainer extends UIMember {
    constructor (
        parent: HTMLElement 
    ) {
        super(parent, 'div', BoneSelectContainer.name)
        const boneSeletor = new BoneSelector(this.me)
        this.appendChild(boneSeletor)
        this.setOptions = boneSeletor.setOptions.bind(boneSeletor)
        this.getPickedBone = boneSeletor.getValue.bind(boneSeletor)
        this.appendChild(new BoneInfo(this.me))
    }
    public setOptions: (options: Array<string>) => void
    public getPickedBone: () => string | undefined
}

class BoneSelector extends UIMember {
    constructor (
        parent: HTMLElement
    ) {
        super(parent, 'select', BoneSelector.name)
    }
    public setOptions(options: Array<string>) {
        while (this.me.firstChild != undefined) {
            this.me.removeChild(this.me.firstChild);
        }
        options.forEach(element => {
            const option = document.createElement('option')
            option.value = element
            option.innerText = element
            this.me.appendChild(option)
        })
    }
    public getValue(): string | undefined {
        //@ts-ignore
        if(this.me.options[this.me.selectedIndex] == undefined) {
            return undefined
        }
        else {
            //@ts-ignore
            return this.me.options[this.me.selectedIndex].value;
        }
    }
}

class BoneInfo extends UIMember {
    constructor (
        parent: HTMLElement 
    ) {
        super(parent, 'div', BoneInfo.name)
    }
}

class BoneRotatorContainer extends UIMember {
    private value: number = 0
    private numberInput: BoneRotateInput
    private rangeInput: BoneRotateInput
    constructor (
        parent: HTMLElement
    ) {
        super(parent, 'div', BoneRotatorContainer.name)
        this.numberInput = new BoneRotateInput(this.me, "number")
        this.rangeInput = new BoneRotateInput(this.me, "range")
        //@ts-ignore
        this.numberInput.me.addEventListener('input' , (e) => this.setValue(e.target.value))
        //@ts-ignore
        this.rangeInput.me.addEventListener('input' , (e) => this.setValue(e.target.value))
        this.appendChild(this.numberInput)
        this.appendChild(this.rangeInput)

        //@ts-ignore
        this.setValue(this.value)
    }
    public setValue(value: number) {
        this.value = Math.round(value * 100) / 100
        this.numberInput.setValue(this.value)
        this.rangeInput.setValue(this.value)
    }
    public getValue(): number {
        return this.value
    }
}
class BoneRotateInput extends UIMember {
    public static readonly Max: number = 2 * Math.PI
    public static readonly Min: number = -(2 * Math.PI)
    constructor (
        parent: HTMLElement,
        type: string,
    ) {
        super(parent, 'input', BoneRotateInput.name)
        //@ts-ignore
        this.me.type = type
        //@ts-ignore
        this.me.max = BoneRotateInput.Max
        //@ts-ignore
        this.me.min = BoneRotateInput.Min
        //@ts-ignore
        this.me.step = 0.01
        //@ts-ignore
        this.me.name = "test"
    }
    public setValue(value: number) {
        //@ts-ignore
        this.me.value = value
    }
}