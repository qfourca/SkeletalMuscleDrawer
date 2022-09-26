import { InterfaceRoot } from "./types";
import UIRoot from "./root";
import { Controller } from "../../state";
export default class UserInterface extends InterfaceRoot {
    constructor (
        parent: HTMLElement,
        controller: Controller,
        root: HTMLElement
    ) {
        super(parent)
        new UIRoot(this, controller, root)
        this.render()
    }
}