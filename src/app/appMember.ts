import { UpdateAble } from "../interface";
import AppManager from "./appManager";

export default abstract class AppMember implements UpdateAble{
    protected appManager: AppManager
    constructor (
        appManager: AppManager
    ) {
        this.appManager = appManager
    }

    public abstract update: (interval: number) => void
}