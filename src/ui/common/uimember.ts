import { RenderAble } from "../../interface";

export default abstract class UIMember implements RenderAble{
    protected parent: HTMLElement
    protected me: HTMLElement
    protected children: Array<UIMember> = new Array()

    constructor(
        parent: HTMLElement,
        myElement: string,
        className?: string
    ) {
        this.parent = parent
        this.me = document.createElement(myElement)
        if(className != undefined)
            this.me.className = className
    }

    public render = () => {
        this.parent.appendChild(this.me)
        this.children.forEach((child: UIMember) => {
            child.render()
        })
    }

    public update = (interval: number) => {
        this.onUpdate(interval)
        this.children.forEach(child => {
            child.update(interval)
        })
    }

    protected abstract onUpdate: (interval: number) => void
}