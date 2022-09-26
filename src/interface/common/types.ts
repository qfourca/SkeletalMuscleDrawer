export class InterfaceNode {
    private parent: InterfaceNode | InterfaceRoot
    public me: HTMLElement
    protected children: Array<InterfaceNode> = new Array()
    constructor(
        parent: InterfaceNode | InterfaceRoot,
        type: string, 
        className?: string
    ) {
        this.parent = parent
        this.me = document.createElement(type)
        if(className != undefined) this.me.className = className
        this.parent.append(this)
    }
    public render() {
        this.children.forEach((child) => {
            this.me.appendChild(child.me)
            child.render()
        })
    }
    public append(child: InterfaceNode) {
        this.children.push(child)
    }
    public onUpdate() {
        
    }
    public update() {
        this.onUpdate()
        this.children.forEach((child) => {
            child.update()
        })
    }
}

export class InterfaceRoot {
    private parent: HTMLElement
    private children: Array<InterfaceNode> = new Array()
    constructor (
        parent: HTMLElement
    ) {
        this.parent = parent
    }
    public render() {
        this.children.forEach((child) => {
            this.parent.appendChild(child.me)
            child.render()
        })
    }
    public append(child: InterfaceNode) {
        this.children.push(child)
    }
    public onUpdate() {
        
    }
    public update() {
        this.onUpdate()
        this.children.forEach((child) => {
            child.update()
        })
    }
}