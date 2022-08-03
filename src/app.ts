import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Human from "./human";
import * as Core from './core'
export default class App {
    private scene:Core.Scene
    private camera:Core.Camera
    private renderer:Core.Renderer
    private control:OrbitControls
    private human:Human
    // private isdev:boolean = false
    public moveBone:(name: string, move: THREE.Vector3, taken: number, reservation?: number) => void
    constructor(width: number, height: number) {
        this.scene = new Core.Scene()
        this.camera = new Core.Camera(95, width / height)
        this.renderer = new Core.Renderer(window.innerWidth, window.innerHeight, document.body)

        const light = new THREE.DirectionalLight(0xffffff, 1)
        this.scene.add(light)
        this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.human = new Human('./human.gltf', 'standing', this.scene)
        this.moveBone = this.human.moveBone.bind(this.human)
        this.update()
    }
    update() {
        requestAnimationFrame(this.update.bind(this))
        this.control.update()
        this.human.update()
        this.render()
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
