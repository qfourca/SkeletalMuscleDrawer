import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Camera from "./Camera";
import Renderer from "./Renderer";
import Scene from "./Scene";
import Light from "./Light";

export default class Three {
    private scene:Scene
    private camera:Camera
    private renderer:Renderer
    private light:Light
    private control:OrbitControls
    private parent: HTMLElement
    constructor(
        parent: HTMLElement
    ) {
        this.parent = parent
        this.scene = new Scene()
        this.camera = new Camera(70, this.parent.clientWidth / this.parent.clientHeight)
        this.renderer = new Renderer(this.parent)
        this.control = new OrbitControls(this.camera, parent)
        this.light = new Light()
        this.light.addLight(this.scene)
        window.addEventListener('resize', this.resize.bind(this), false)
    }
    public update = () => {
        this.control.update()
        this.render()
    }
    private render = () => {
        this.renderer.render(this.scene, this.camera)
    }
    private resize = () => {
        this.camera.aspect = this.parent.clientWidth / this.parent.clientHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.parent.clientWidth, this.parent.clientHeight)
        this.render()
    }
    public getScene = () => {
        return this.scene
    }
}

export { Camera, Renderer, Scene, Light }