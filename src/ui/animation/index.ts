import { AppManager } from "../../app";
import UIMember from "../common";

import AnimationTimeline from "./timeline";
import BonePicker from "./bonepicker";
import Buttons from "./buttons";
export default class AnimationUI extends UIMember {
    constructor (
        parent: HTMLElement,
        appManager: AppManager
    ) {
        super(parent, 'div', AnimationUI.name)
        const animationTimeline = new AnimationTimeline(this.me, appManager)

        this.appendChild(animationTimeline)
        this.appendChild(new BonePicker(this.me, appManager))
        this.appendChild(new Buttons(this.me, appManager))
    }
}