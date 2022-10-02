import { InterfaceNode, InterfaceRoot } from "./types";
//@ts-ignore
import S from '../styles/index.scss'
import TimeLine from "../timeline";
import { Webcam } from "../../util";
import Modal, { modalResult } from "./modal";
import Realtime from "../realtime";
import Motion, { JointList, PoseInfo } from "../../motion";
//@ts-ignore
import videoSrc from "../../static/video/oneStar.mp4"
import SquartAnalysis from "../../analysis/squart";
import Result from "./result";
export default class UIRoot extends InterfaceNode {
    private result: Result
    constructor (
        parent: InterfaceRoot
    ) {
        super(parent, 'div', S.ui_root)
        this.result = new Result(parent)
        const realTime: Realtime = new Realtime(this)
        let score: number = 0
        const modeSetting = (res: modalResult) => {
            if(res.mode === "realtime") {
                realTime.display(res.value)
                const video = realTime.getVideo()
                const squart = new SquartAnalysis((res) => {
                    realTime.setCounter(realTime.getCounter() + res.count)
                    score += res.score
                    if(realTime.getCounter() >= realTime.getMax()) {
                        alert(String(Math.round(score / realTime.getMax() * 10) / 10))
                    }
                })
                new Webcam(video, videoSrc)
                new Motion(video, InterfaceNode.controller.getScene(), (arg) => {squart.input(arg.boneRotations)})
            }
            modal.hide()
        }
        const modal: Modal = new Modal(parent, modeSetting)
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