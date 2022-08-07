import * as THREE from 'three'
import Button, { ButtonContainer } from './button'
import Controller from './controller'
import TimeLine from './timeline'

export default class UI {
    private parent:HTMLElement
    private buttons:ButtonContainer
    private controller: Controller
    private timeLine: TimeLine
    constructor(
        domElement: HTMLElement,
        buttons: Array<FunctionAndExpression>
    ) {
        this.parent = domElement
        
        this.buttons = new ButtonContainer(this.parent)
        this.timeLine = new TimeLine(this.parent)
        this.controller = new Controller(this.parent)
        buttons.forEach((element) => {
            new Button(this.buttons.me, element.expression, element.func)
        })
    }

    public setOptions(options: Array<string>) {
        this.controller.setOptions(options)
    }
    public setBone(func: (a: string) => THREE.Bone | undefined) {
        this.controller.setBone(func)
    }
}
export interface FunctionAndExpression {
    func: any
    expression: string
}