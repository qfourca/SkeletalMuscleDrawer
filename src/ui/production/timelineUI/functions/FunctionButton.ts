import UIRoot from "../../../ui";

export default abstract class FunctionButton extends UIRoot{
    constructor (
        parent: HTMLElement,
        icon: string,
        float?: boolean
    ) {
        super(parent)
        this.element = document.createElement('div')
        this.element.className = `function-button ${float ? 'right' : 'left'}`
        this.element.style.backgroundImage = `url(${icon})`
        this.element.addEventListener('click', this.click.bind(this))
        this.render()
    }
    protected abstract click(): void
}