import { AppManager, AppMember } from "../app"
import { RenderAble } from "../interface"
import UIMember from "./common/uimember"

import ProductionUI from "./production"
import AnimationUI from "./animation"

import './style.scss'

export default class UI extends AppMember implements RenderAble {
    private myUI: UIMember
    constructor(
        appManager: AppManager
    ) {
        super(appManager)
        this.appManager.root.appendChild(appManager.uiRoot)
        this.myUI = 
            this.appManager.option.UI === "animation" ?
            new AnimationUI(appManager.uiRoot, appManager) : 
            new ProductionUI(appManager.uiRoot, appManager) 
        this.render()
    }

    public update = (interval: number) => {
        this.myUI.update(interval)
    }

    public render = () => {
        this.myUI.render()
    }
}