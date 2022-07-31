import * as THREE from 'three'

export default class Renderer extends THREE.WebGLRenderer{
	constructor (width: number, height: number, domElement: HTMLElement) {
		super({
			antialias: true
		})
		this.setSize(width, height)
		domElement.appendChild(this.domElement);
	}
}