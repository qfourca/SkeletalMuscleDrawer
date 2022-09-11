import { AppManager } from "../../app";
import UIMember from "../common";
import TimeLine from "../common/timeline";
export default class ProductionUI extends UIMember {
    constructor (
        parent: HTMLElement,
        appManager: AppManager
    ) {
        super(parent, 'div', ProductionUI.name)
        this.appendChild(new ProductionTimeline(this.me, appManager))
    }
}
class ProductionTimeline extends TimeLine {
    private response: number = 500
    private isHided: boolean = false
    private appManager: AppManager
    constructor (
        parent: HTMLElement,
        appManager: AppManager
    ) {
        super(parent, appManager)
        this.appManager = appManager
        appManager.root.addEventListener('mousemove', () => {
            this.isHided = false
            this.response = 1500
        })
    }
    protected onUpdate = (interval: number) => {
        if(this.me.classList[1] === 'hide' && !this.isHided) {
            this.me.classList.remove('hide')
        }
        if(!this.isHided) {
            this.response -= interval
            if(this.response < 0) {
                this.me.classList.add('hide')
                this.isHided = true
            }
        }
    };
}