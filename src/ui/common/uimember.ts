import { RenderAble } from "../../interface";

export default abstract class UIMember implements RenderAble{
    protected parent: HTMLElement
    protected me: HTMLElement
    private children: Array<UIMember> = new Array()

    constructor(
        parent: HTMLElement,
        myElement: string,
        className?: string
    ) {
        this.parent = parent
        this.me = document.createElement(myElement)
        this.me.className = className == undefined ? "" : className
    }

    protected appendChild = (child: UIMember) => {
        this.children.push(child)
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

    protected onUpdate = (interval: number) => {

    }
}