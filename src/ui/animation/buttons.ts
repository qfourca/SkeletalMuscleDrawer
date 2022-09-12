import { AppManager } from "../../app";
import UIMember from "../common";

export default class Buttons extends UIMember {
    private appManager: AppManager
    private readonly buttonInfos:Array<ButtonInfo> = [
        {
            name: "print",
            onClick: () => {
                console.log(this.appManager.animation)
            }
        }
    ]
    constructor(
        parent: HTMLElement,
        appManger: AppManager
    ) {
        super(parent, 'div', "ButtonContainer")
        this.appManager = appManger
        this.buttonInfos.forEach((buttonInfo: ButtonInfo) => {
            this.appendChild(new Button(this.me, buttonInfo))
        })
    }
}

class Button extends UIMember {
    constructor (
        parent: HTMLElement,
        buttonInfo: ButtonInfo
    ) {
        super(parent, 'div', Button.name)
        this.me.innerText = buttonInfo.name
        this.me.addEventListener('click', buttonInfo.onClick)
    }
}
interface ButtonInfo {
    name: string,
    onClick: (e: Event) => void
}