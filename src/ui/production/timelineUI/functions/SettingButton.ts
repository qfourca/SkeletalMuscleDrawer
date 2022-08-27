import FunctionButton from "./FunctionButton";
import FullScreen from "../../../../util/fullscreen/intex";

export default class FullScreenButton extends FunctionButton {
    private fullScreen: FullScreen
    constructor (
        parent: HTMLElement,
        icon: string,
        target: HTMLElement
    ) {
        super(parent, icon, true)
        this.fullScreen = new FullScreen(target)
    }
    protected click(): void {
        console.log("setting")
    }   
}