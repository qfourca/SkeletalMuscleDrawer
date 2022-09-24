import { Scene } from "../three";

import Human from "./human";
import Animation from "./animation";
import Engine from "./engine";
import bindList, { bind } from "./bind"
import { Controller } from "../state";
export default class Core {
    private human: Human
    private animation: Animation
    private engine: Engine

    constructor (
        humanFile: string,
        animationFile: string | any,
        scene: Scene,
        app: Controller
    ) {
        this.human = new Human(humanFile, scene)
        this.animation = new Animation(animationFile)
        this.engine = new Engine(this.human, this.animation, app)
    }
    
    private onResult(poseInfo: any) {
        bindList.forEach((element: bind) => {
            const get = poseInfo.boneRotations.get(element.posename)
            if(get != undefined) {
                //@ts-ignore
                this.animation[0].postures.get(element.target)['_' + element.direction] 
                    = element.delta == undefined ? get : element.delta(get)
            }
        })
        // console.log(poseInfo.boneRotations.get("leftLeg")! * 180 / Math.PI, 
        //             poseInfo.boneRotations.get("rightLeg")! * 180 / Math.PI)
    }
    
    public update = () => {
        this.engine.update()
    }
}