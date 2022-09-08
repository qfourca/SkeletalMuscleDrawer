import { UpdateAble } from "../interface";
import AppManager from "./appManager";

export default abstract class AppMember implements UpdateAble{
    protected appManager: AppManager
    protected parent: HTMLElement
    constructor (
        parent: HTMLElement,
        appManager: AppManager
    ) {
        this.appManager = appManager
        this.parent = parent
    }

    public abstract update: (interval: number) => void
}