import { InterfaceNode } from "../common/types";
//@ts-ignore
import S from '../styles/index.scss'

import IconInfo, * as Icon from "../common/icon";

export default class FunctionContainer extends InterfaceNode {
    constructor (
        parent: InterfaceNode,
        icons: Array<IconInfo>,
    ) {
        super(parent, 'div', S.FunctionContainer)
        new Functions(this, icons)
    }
}

class Functions extends InterfaceNode {
    constructor(
        parent: InterfaceNode,
        icons: Array<IconInfo>
    ) {
        super(parent, 'div', S.Functions)
        icons.forEach((icon: IconInfo) => {
            new Function(this, icon)
        })
    }
}
class Function extends InterfaceNode {
    private icon: IconInfo
    constructor (
        parent: InterfaceNode,
        icon: IconInfo
    ) {
        super(parent, 'div', S.Function)
        this.icon = icon 
        this.rendering()
    }
    public onUpdate(): void {
        
        if(this.icon.reload) {
            this.rendering()
            this.icon.reload = false
        }
    }
    private rendering() {
        this.me.style.backgroundImage = `url('${this.icon.src}')`
        if(this.icon.color != undefined) {
            this.me.style.backgroundColor = `rgba(${this.icon.color}, 1)`
        }
        if(this.icon.onClick != undefined) {
            this.me.addEventListener('click', this.icon.onClick)
        }
    }
}