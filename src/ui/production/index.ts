import UIMember from "../common";
import TimeLine from "../common/timeline";
export default class ProductionUI extends UIMember {
    constructor (
        parent: HTMLElement
    ) {
        super(parent, 'div', ProductionUI.name)
        this.children.push(new TimeLine(this.me))
    }
    protected onUpdate = (interval: number) => {

    }
}