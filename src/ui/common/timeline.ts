import UIMember from "./uimember";

export default class timeLine extends UIMember{
    constructor (
        parent: HTMLElement
    ) {
        super(parent, 'div', 'timeline')
    }

    protected onUpdate = () => {
        
    };
}