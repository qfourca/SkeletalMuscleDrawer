import { InterfaceNode, InterfaceRoot } from "./types";
//@ts-ignore
import root from '../styles/index.scss'
import TimeLine from "../timeline";
import { Controller } from "../../state";
export default class UIRoot extends InterfaceNode {
    constructor (
        parent: InterfaceRoot,
        controller: Controller
    ) {
        super(parent, 'div', root.ui_root)
        new TimeLine(this, controller)
    }
}