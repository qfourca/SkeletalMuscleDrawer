import UIRoot from "../../ui";

export default class Button extends UIRoot{
    constructor(parent: HTMLElement, info: buttonInfo) {
        super(parent)
        this.element.className = 'button'
        this.element.addEventListener('click', info.onClick)
        this.element.innerText = info.expression
    }
}

export interface buttonInfo {
    onClick: () => void
    expression: string
}