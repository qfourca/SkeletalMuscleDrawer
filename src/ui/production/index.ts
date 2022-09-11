import { AppManager } from "../../app";
import UIMember from "../common";
import TimeLine from "../common/timeline";
export default class ProductionUI extends UIMember {
    constructor (
        parent: HTMLElement,
        appManager: AppManager
    ) {
        super(parent, 'div', ProductionUI.name)
        this.appendChild(new TimeLine(this.me, appManager))
    }
    protected onUpdate = (interval: number) => {

    }
}