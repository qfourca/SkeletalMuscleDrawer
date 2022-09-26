import { InterfaceRoot } from "./types";
import UIRoot from "./root";
import { Controller } from "../../state";
export default class UserInterface extends InterfaceRoot {
    constructor (
        parent: HTMLElement,
        controller: Controller
    ) {
        super(parent)
        new UIRoot(this, controller)
        this.render()
    }
}