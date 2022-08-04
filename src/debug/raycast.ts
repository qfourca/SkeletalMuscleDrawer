import * as THREE from 'three'
import Human from '../human'
export default class Raycast {
    private raycaster: THREE.Raycaster
    private camera: THREE.Camera
    private human: Human
    constructor(
        camera: THREE.Camera,
        human: Human
    ) {
        this.camera = camera
        this.human = human
        this.raycaster = new THREE.Raycaster()
    }
    mouseMove(event:MouseEvent) {
        // const mouse = new THREE.Vector2()
        // let gap1 = event.clientX - event.offsetX
        // let gap2 = event.clientY - event.offsetY
        // mouse.x = ( (event.clientX - gap1)/(window.innerWidth) )*2 -1;
        // mouse.y =  -( (event.clientY-gap2)/(window.innerHeight ) )*2 +1;
        // if(this.human.body != undefined) {
        //     this.raycaster.setFromCamera(mouse, this.camera);
        //     console.log(this.raycaster.intersectObjects(this.human.body.children))
        // }
    }
}