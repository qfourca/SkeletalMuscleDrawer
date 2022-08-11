import Animation from '../../animation';
import Human from "../../human";
import UIRoot from '../ui'
export default class ProductionUI implements UIRoot{
    private parent: HTMLElement
    constructor(
        parent: HTMLElement
    ) {
        this.parent = parent
    }
}