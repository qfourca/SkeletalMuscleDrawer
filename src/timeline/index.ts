import * as THREE from 'three'
import Posture from "../posture"

export default class TimeLine {
    private timeLine:Array<Array<Posture>> = new Array()
    constructor(
        
    ) {

    }
    public push(posture: Array<Posture>) {
        const deepClonedArray = new Array()
        posture.forEach(element => {
            if(!Posture.compare(element, this.getRootPosture(element.name))) {
                deepClonedArray.push(new Posture(element.name, new THREE.Euler(element.rotation.x, element.rotation.y, element.rotation.z)))
            }
        })
        this.timeLine.push(deepClonedArray)
    }
    private getRootPosture(name: string) {
        for(let i = this.timeLine.length - 1; i >= 0; i--) {
            const res = this.timeLine[i].find((element) => element.name === name)
            if(res != undefined) return res
        }
        return  {
            name: 'unExist',
            rotation: new THREE.Euler()
        }
    }
    
}