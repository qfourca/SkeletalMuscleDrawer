import TimeLine from '../../timeline';
import Human from "../../human";
import UIRoot from '../ui'
export default class Animation implements UIRoot{
    private parent: HTMLElement
    constructor(
        parent: HTMLElement
    ) {
        this.parent = parent
    }
}