import { InterfaceRoot, InterfaceNode } from "./types";
import UIRoot from "./root";
import { Controller } from "../../state";
export default class UserInterface extends InterfaceRoot {
    constructor (
        parent: HTMLElement,
        controller: Controller,
        root: HTMLElement
    ) {
        super(parent)
        InterfaceNode.controller = controller
        InterfaceNode.root = root
        new UIRoot(this)
        this.render()
    }
}