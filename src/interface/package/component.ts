import Member from "../../app/member"
import App from "../../app/app"

export default class Component extends Member{
    protected html:string = ""
    private nodes: Array<ChildNode> = new Array()
    private parent: HTMLElement
    constructor (
        app: App,
        parent: HTMLElement
    ) {
        super(app)
        this.parent = parent
    }
    public render(html?: string) {
        const target = html ?? this.html
        const nodes = new DOMParser().parseFromString(target, 'text/html').body.childNodes
        nodes.forEach((node) => {
            this.nodes.push(node)
            this.parent.appendChild(node)
        })
    }
    public destructor (

    ) {
        this.nodes.forEach((node) => {
            this.parent.removeChild(node)
        })
    }
    public getAsClassName(className: string): HTMLElement {
        //@ts-ignore
        return this.parent.getElementsByClassName(className)[0]
    }
}