import * as THREE from 'three'

export default class Renderer extends THREE.WebGLRenderer{
	constructor (domElement: HTMLElement) {
		super({
			antialias: true
		})
		this.outputEncoding = THREE.sRGBEncoding
		this.setSize(domElement.clientWidth, domElement.clientHeight)
		domElement.appendChild(this.domElement);
	}
}