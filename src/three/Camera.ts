import * as THREE from 'three'

class Camera extends THREE.PerspectiveCamera{
	constructor (FOV: number, aspect: number) {
		super(FOV, aspect, 1, 1000)
		this.position.z = 2
		this.position.y = -1
		this.near = 0.001
		this.far = 500
		this.scale.set(0.1, 0.1, 0.1)
	}
}
export default Camera