import * as THREE from 'three'

export default class Light extends THREE.DirectionalLight{
    constructor(){
        const color = 0xffffff;
        const intensity = 1; // 강도
        super(color,intensity);
    }

    addLight(scene:THREE.Scene){
        scene.add(this)
    }
}