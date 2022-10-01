import { InterfaceNode, InterfaceRoot } from "./types";
//@ts-ignore
import S from '../styles/index.scss'
import TimeLine from "../timeline";
import { Controller } from "../../state";
import Modal from "./modal";
export default class UIRoot extends InterfaceNode {
    constructor (
        parent: InterfaceRoot,
        controller: Controller,
        root: HTMLElement
    ) {
        super(parent, 'div', S.ui_root)
        const modal: Modal = new Modal(root, parent)
        controller.onModeChange((mode: string) => {
            if(mode == "analysis") {
                modal.expose()
            }
            else if(mode == "default") {
                console.log(mode)
            }
        })
        new TimeLine(this, controller, root)
    }
}