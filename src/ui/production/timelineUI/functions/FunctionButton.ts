import UIRoot from "../../../ui";

export default abstract class FunctionButton {
    protected element: HTMLObjectElement
    private parent: HTMLElement
    constructor (
        parent: HTMLElement,
        icon: string,
        float?: boolean
    ) {
        this.parent = parent
        this.element = document.createElement('object')
        this.element.className = `function-button ${float ? 'right' : 'left'}`
        this.element.data = icon
        this.element.style.backgroundImage = `url(${icon})`
        this.element.addEventListener('click', this.click.bind(this))
        this.parent.appendChild(this.element)
    }
    protected abstract click(): void
}