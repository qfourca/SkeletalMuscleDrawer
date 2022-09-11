import { RenderAble } from "../../interface";

export default abstract class UIMember implements RenderAble{
    protected parent: HTMLElement
    public me: HTMLElement
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
    protected findChildAsClass = (className: string) => {
        return this.children.find((element) => element.me.className === className)
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