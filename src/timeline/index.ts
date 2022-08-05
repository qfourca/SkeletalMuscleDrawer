import * as THREE from 'three'
import Posture from "../posture"

export default class TimeLine {
    private timeLine:Array<Array<Posture>>
    constructor(
        startValue?: Array<Array<Posture>>
    ) {
        if(startValue != undefined) this.timeLine = startValue
        else this.timeLine = new Array()
    }
    public push(posture: Array<Posture>) {
        const deepClonedArray = new Array()
        posture.forEach(element => {
            if(!Posture.compare(element, this.getRootPosture(element.name))) {
                deepClonedArray.push(new Posture(element.name, new THREE.Euler(element.rotation.x, element.rotation.y, element.rotation.z)))
            }
        })
        if(deepClonedArray.length != 0) this.timeLine.push(deepClonedArray)
    }
    public download() {
        const element = document.createElement('a')
        element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this))
        element.setAttribute('download', "animation.json")
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
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