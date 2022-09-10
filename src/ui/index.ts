import { AppManager, AppMember } from "../app"
import { RenderAble } from "../interface"
import UIMember from "./common/uimember"
import ProductionUI from "./production"

import './style.scss'

export default class UI extends AppMember implements RenderAble {
    private myUI: UIMember
    constructor(
        appManager: AppManager
    ) {
        super(appManager)
        this.appManager.root.appendChild(appManager.uiRoot)
        this.myUI = new ProductionUI(appManager.uiRoot)
        this.render()
    }

    public update = (interval: number) => {
        this.myUI.update(interval)
    }

    public render = () => {
        this.myUI.render()
    }
}