export default abstract class UIRoot {
    protected parent:HTMLElement
    protected element: HTMLDivElement
    constructor(
        parent: HTMLElement
    ) {
        this.parent = parent
        this.element = document.createElement('div')
    }
    public render() {
        this.parent.appendChild(this.element)
    }
    public update(interval: number): void { }
}