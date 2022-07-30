import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default class App {
    private scene:THREE.Scene
    private camera:THREE.PerspectiveCamera
    private renderer:THREE.WebGLRenderer
    constructor(width: number, height: number) {

        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(95, width / height, 0.1, 1000)
        this.camera.position.z = 2
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)


        const controls = new OrbitControls(this.camera, this.renderer.domElement)
        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true,
        })
        const cube = new THREE.Mesh(geometry, material)
        this.scene.add(cube)
        const animate = () => {
            requestAnimationFrame(animate)

            cube.rotation.x += 0.01
            cube.rotation.y += 0.01

            controls.update()
            this.render()
        }

        animate()
    }
    update() {

    }
    public resize(width: number, height: number) {
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(width, height)
        this.render()
    }

    private render() {
        this.renderer.render(this.scene, this.camera)
    }
}
