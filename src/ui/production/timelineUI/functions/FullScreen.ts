import FunctionButton from "./FunctionButton";
import FullScreen from "../../../../util/fullscreen/intex";

export default class FullScreenButton extends FunctionButton {
    private icons:Array<string> = new Array()
    private fullScreen: FullScreen
    constructor (
        parent: HTMLElement,
        icons: Array<string>,
        target: HTMLElement
    ) {
        super(parent, icons[0], true)
        this.icons = icons
        this.fullScreen = new FullScreen(target)
    }
    protected click(): void {
        if(this.fullScreen.isFullScreen) {
            this.fullScreen.exit()
            this.element.style.backgroundImage = `url(${this.icons[0]})`
        }
        else {
            this.fullScreen.full()
            this.element.style.backgroundImage = `url(${this.icons[1]})`
        }
    }   
}