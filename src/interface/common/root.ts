import { InterfaceNode, InterfaceRoot } from "./types";
//@ts-ignore
import S from '../styles/index.scss'
import TimeLine from "../timeline";
import { Controller } from "../../state";
export default class UIRoot extends InterfaceNode {
    constructor (
        parent: InterfaceRoot,
        controller: Controller,
        root: HTMLElement
    ) {
        super(parent, 'div', S.ui_root)
        new TimeLine(this, controller, root)
    }
}