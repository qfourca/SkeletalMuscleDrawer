import * as THREE from 'three'

export default class Renderer extends THREE.WebGLRenderer{
	constructor (width: number, height: number, domElement: HTMLElement) {
		super({
			antialias: true
		})
		this.setSize(width, height)
		this.domElement.style.position = "absolute"
		domElement.appendChild(this.domElement);
	}
}