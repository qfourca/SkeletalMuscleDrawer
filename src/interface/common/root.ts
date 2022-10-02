import { InterfaceNode, InterfaceRoot } from "./types";
//@ts-ignore
import S from '../styles/index.scss'
import TimeLine from "../timeline";
import { Webcam } from "../../util";
import Modal, { modalResult } from "./modal";
import Realtime from "../realtime";
import Motion, { PoseInfo } from "../../motion";
//@ts-ignore
import videoSrc from "../../static/video/oneStar.mp4"
export default class UIRoot extends InterfaceNode {
    constructor (
        parent: InterfaceRoot
    ) {
        super(parent, 'div', S.ui_root)
        const realTime: Realtime = new Realtime(this)
        const modeSetting = (res: modalResult) => {
            if(res.mode === "realtime") {
                realTime.display()
                const video = realTime.getVideo()
                new Webcam(video, videoSrc)
                new Motion(video, InterfaceNode.controller.getScene(), this.onResult.bind(this))
            }
            modal.hide()
        }
        const modal: Modal = new Modal(parent, modeSetting.bind(this))
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
    private onResult(pose: PoseInfo) {
        const { boneRotations } = pose
        console.log(boneRotations)
    }
}