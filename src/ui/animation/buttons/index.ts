import UIRoot from "../../ui";
import Button, { buttonInfo } from "./button";
export default class Buttons extends UIRoot{
    private buttons:Array<Button> = new Array()
    constructor(parent: HTMLElement, buttons: Array<buttonInfo>) {
        super(parent)
        this.element.className = 'button-container'
        buttons.forEach((element: buttonInfo) => {
            this.buttons.push(new Button(this.element, element))
        })
    }
    render() {
        this.parent.appendChild(this.element)
        this.buttons.forEach(element => {
            element.render()
        })
    }
}

export {
    buttonInfo as buttonInfo
}
