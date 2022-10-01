import * as THREE from 'three'

class Camera extends THREE.PerspectiveCamera{
	constructor (FOV: number, aspect: number) {
		super(FOV, aspect, 1, 1000)
		this.position.z = 100
		this.near = 0.1
		this.far = 500
	}
}
export default Camera