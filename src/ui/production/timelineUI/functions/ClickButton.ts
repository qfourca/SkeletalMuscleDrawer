import FunctionButton from "./FunctionButton";

export default class ClickButton extends FunctionButton {
    private onClick: () => any
    constructor (
        parent: HTMLElement,
        icon: string,
        click: () => any
    ) {
        super(parent, icon)
        this.onClick = click
    }
    protected click(): void {
        this.onClick()
    }
}