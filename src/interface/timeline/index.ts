import { Controller } from "../../state";
import { InterfaceNode } from "../common/types";
//@ts-ignore
import S from '../styles/index.scss'
import Progress from './progress'

import IconInfo, * as Icon from "../common/icon";
import FunctionContainer from "./function";
export default class TimeLine extends InterfaceNode {
    constructor (
        parent: InterfaceNode,
        controller: Controller
    ) {
        super(parent, "div", S.TimeLine)
        new Progress(this, controller)
        const icons:Array<IconInfo> = [
            {
                src: Icon.foward,
                color: "200, 0, 0",
                onClick: () => {}
            },
            {
                src: Icon.skip_next,
                color: "200, 100, 0",
                onClick: () => {}
            },
            {
                src: Icon.pause,
                color: "200, 200, 0",
                onClick: () => {}
            },
            {
                src: Icon.skip_previous,
                color: "100, 200, 0",
                onClick: () => {}
            },
            {
                src: Icon.replay,
                color: "0, 100, 200",
                onClick: () => {}
            },
            {
                src: Icon.setting,
                color: "0, 0, 200",
                onClick: () => {}
            },
            {
                src: Icon.fullscreen,
                color: "100, 0, 200",
                onClick: () => {}
            },
        ]
        new FunctionContainer(this, icons)
    }

}