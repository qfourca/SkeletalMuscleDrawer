import { AppManager } from "../../app";
import UIMember from "../common";
import TimeLine from "../common/timeline";
export default class AnimationUI extends UIMember {
    constructor (
        parent: HTMLElement,
        appManager: AppManager
    ) {
        super(parent, 'div', AnimationUI.name)
        this.appendChild(new TimeLine(this.me, appManager))
    }
    protected onUpdate = (interval: number) => {

    }
}