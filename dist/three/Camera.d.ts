import * as THREE from 'three';
declare class Camera extends THREE.PerspectiveCamera {
    constructor(FOV: number, aspect: number);
}
export default Camera;
