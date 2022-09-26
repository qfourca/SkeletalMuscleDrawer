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
    constructor (
        parent: InterfaceNode,
        icon: IconInfo
    ) {
        super(parent, 'div', S.Function)
        this.me.style.backgroundImage = `url('${icon.src}')`
        if(icon.color != undefined) {
            this.me.style.backgroundColor = `rgba(${icon.color}, 0.7)`
        }
        if(icon.onClick != undefined) {
            this.me.addEventListener('click', icon.onClick)
        }        
    }
}