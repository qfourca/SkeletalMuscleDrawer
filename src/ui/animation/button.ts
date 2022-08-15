export default class Button {
    constructor(
        parent: HTMLElement,
        expression: string,
        onClick: (a: any) => any,
        option?: Option
    ) {
        const button = document.createElement('div')
        button.onclick = onClick
        button.innerText = expression
        button.style.fontSize = "24px"
        button.style.textAlign = 'center'
        button.style.lineHeight = '100px'
        button.style.width = '20%'
        button.style.height = '100px'
        button.style.backgroundColor = "green"
        button.style.cursor = 'pointer'
        parent.appendChild(button)
    }
}
export class ButtonContainer {
    public me: HTMLDivElement
    constructor (
        parent: HTMLElement
    ) {
        this.me = document.createElement('div')
        this.me.style.height = '100px'
        this.me.style.width = '50%'
        this.me.style.display = "flex"
        this.me.style.gap = '10px'
        this.me.style.position = "absolute"
        parent.appendChild(this.me)
    }
}
export interface Option {

}