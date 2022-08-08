import * as THREE from 'three'
import Button, { ButtonContainer } from './button'
import Controller from './controller'
import TimeLineUI from './timeline'
import TimeLine from '../../timeline'
export default class UI {
    private parent:HTMLElement
    private buttonContainer:ButtonContainer
    private buttons: Array<Button> = new Array()
    private controller: Controller
    private timeLineUI: TimeLineUI
    private timeLine: TimeLine
    constructor(
        domElement: HTMLElement,
        buttonInfo: Array<FunctionAndExpression>,
        timeLine: TimeLine
    ) {
        this.parent = domElement
        this.timeLine = timeLine

        this.buttonContainer = new ButtonContainer(this.parent)
        this.timeLineUI = new TimeLineUI(this.parent, this.timeLine)
        this.controller = new Controller(this.parent)
        buttonInfo.forEach((element) => {
            this.buttons.push(new Button(this.buttonContainer.me, element.expression, element.func))
        })
    }

    public setOptions(options: Array<string>) {
        this.controller.setOptions(options)
    }
    public setBone(func: (a: string) => THREE.Bone | undefined) {
        this.controller.setBone(func)
    }
    public timeLineChange() {
        this.timeLineUI.reload()
    }
    public getTime() {
        return this.timeLineUI.currentPos()
    }
}
export interface FunctionAndExpression {
    func: any
    expression: string
}