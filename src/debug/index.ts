export default class UI {
    private parent:HTMLElement
    private buttons:Array<HTMLDivElement> = new Array()
    constructor(
        domElement: HTMLElement, 
        buttons: Array<FunctionAndExpression>
    ) {
        this.parent = domElement
        const buttonContainer = document.createElement('div')
        buttonContainer.style.height = '100px'
        buttonContainer.style.width = '50%'
        buttonContainer.style.display = "flex"
        buttonContainer.style.gap = '10px'
        buttonContainer.style.position = "absolute"

        buttons.forEach((element:FunctionAndExpression) => {
            const button = this.button(element)
            this.buttons.push(button)
            buttonContainer.appendChild(button)
        })
        this.parent.appendChild(buttonContainer)
    }
    private button(arg:FunctionAndExpression): HTMLDivElement {
        const button = document.createElement('div')
        button.onclick = arg.func
        button.innerText = arg.expression
        button.style.fontSize = "24px"
        button.style.textAlign = 'center'
        button.style.lineHeight = '100px'
        button.style.width = '20%'
        button.style.height = '100px'
        button.style.backgroundColor = "green"
        button.style.cursor = 'pointer'
        return button
    }

}
export interface FunctionAndExpression {
    func: any
    expression: string
}