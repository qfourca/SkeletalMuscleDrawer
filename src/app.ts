import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Human from "./human";
import * as Core from './core'
import Posture from './posture';
export default class App {
    private scene:Core.Scene
    private camera:Core.Camera
    private renderer:Core.Renderer
    private control:OrbitControls
    private parent:HTMLElement
    private human:Human

    public moveBone:(name: string, move: THREE.Vector3, taken: number, reservation?: number) => void
    constructor(
        domElement: HTMLElement,
        file: string
    ) {
        this.parent = domElement
        this.scene = new Core.Scene()
        this.camera = new Core.Camera(95, this.parent.clientWidth / this.parent.clientHeight)
        this.renderer = new Core.Renderer(this.parent.clientWidth, this.parent.clientHeight, this.parent)
        this.scene.add(new THREE.DirectionalLight(0xffffff, 1))
        this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.human = new Human(file, this.scene)
        this.moveBone = this.human.moveBone.bind(this.human)
        window.addEventListener('resize', this.resize.bind(this), false)
        this.update()
    }
    update() {
        requestAnimationFrame(this.update.bind(this))
        this.control.update()
        this.human.update()
        this.render()
    }
    public resize(e:any) {
        this.camera.aspect = this.parent.clientWidth / this.parent.clientHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.parent.clientWidth, this.parent.clientHeight)
        this.render()
    }

    private render() {
        this.renderer.render(this.scene, this.camera)
    }
}
