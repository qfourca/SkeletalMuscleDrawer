import { Euler } from 'three'
export default class Posture {
    name: string
    rotation: THREE.Euler
    constructor(
        name: string,
        rotation?: THREE.Euler
    ) {
        this.name = name
        if(rotation == undefined) this.rotation = new Euler()
        else this.rotation = rotation
    }
    public static compare(posture1: Posture, posture2: Posture): boolean {
        // console.log(posture1.rotation.x, posture2.rotation.x)
        return posture1.rotation.x == posture2.rotation.x &&
               posture1.rotation.y == posture2.rotation.y &&
               posture1.rotation.z == posture2.rotation.z
    }
}