import { UpdateAble } from "../../app/update"

export default abstract class Component implements UpdateAble { 
    protected static root: HTMLElement
    protected abstract html: string
    private children: Array<Component>
    private parent: Element
    constructor (
        parent: Element,
    ) {
        this.parent = parent
        this.children = new Array()
    }
    render() {
        const nodes = new DOMParser().parseFromString(this.html, 'text/html').body.childNodes[0]
        if(nodes != undefined)
            this.parent.appendChild(nodes)
        this.children.forEach((child) => {
            child.render()
        })
    }
    update: (interval: number) => void = (interval: number) => {
        this.children.forEach((child) => {
            child.update(interval)
        })
    }
    appendChild(component: Component) {
        this.children.push(component)
    }
    protected getAsClassName(className: string) {
        return this.parent.getElementsByClassName(className)[0]
    }
}