import { InterfaceNode, InterfaceRoot } from "./types";
//@ts-ignore
import S from '../styles/index.scss'
import TimeLine from "../timeline";
import { Controller } from "../../state";
import Modal, { modalResult } from "./modal";
import Realtime from "../realtime";
export default class UIRoot extends InterfaceNode {
    constructor (
        parent: InterfaceRoot
    ) {
        super(parent, 'div', S.ui_root)
        const modeSetting = (res: modalResult) => {
            if(res.mode === "realtime") {
                realTime.display()
            }
            modal.hide()
        }
        const modal: Modal = new Modal(parent, modeSetting.bind(this))
        const realTime: Realtime = new Realtime(this)
        InterfaceNode.controller.onModeChange((mode: string) => {
            if(mode == "analysis") {
                modal.expose()
            }
            else if(mode == "default") {
                console.log(mode)
            }
        })
        new TimeLine(this)
    }
}