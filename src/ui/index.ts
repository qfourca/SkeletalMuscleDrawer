import { AppManager, AppMember } from "../app"
import { RenderAble } from "../interface"
import UIMember from "./common/uimember"

export default class UI extends AppMember implements RenderAble {
    private parent: HTMLElement
    private children: Array<UIMember> = new Array()
    constructor(
        parent: HTMLElement,
        appManager: AppManager
    ) {
        super(appManager)
        this.parent = parent
    }

    public update = (interval: number) => {
        this.children.forEach(child => {
            child.update(interval)
        })
    }

    public render = () => {
        this.children.forEach(child => {
            child.render()
        })
    }
}