import UIMember from "./uimember";

export default class TimeLine extends UIMember{
    constructor (
        parent: HTMLElement
    ) {
        super(parent, 'div', TimeLine.name)
    }

    protected onUpdate = () => {

    };
 }