export default abstract class UIRoot {
    protected parent:HTMLElement
    protected element: HTMLDivElement
    constructor(
        parent: HTMLElement
    ) {
        this.parent = parent
        this.element = document.createElement('div')
    }
    protected append(element: HTMLElement) {
        this.element.appendChild(element)
    }
    public render() {
        this.parent.appendChild(this.element)
    }
    public update(interval: number): void { }
}