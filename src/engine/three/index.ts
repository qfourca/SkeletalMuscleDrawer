import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Camera from "./Camera";
import Renderer from "./Renderer";
import Scene from "./Scene";
import Light from "./Light";
import App from '../../app/app';
import Member from '../../app/member';

export default class Three extends Member{
    private scene:Scene
    private camera:Camera
    private renderer:Renderer
    private light:Light
    private control:OrbitControls
    private parent: HTMLElement
    constructor(
        app: App
    ) {
        super(app)
        this.parent = app.rootElement.get()
        this.scene = new Scene()
        this.camera = new Camera(70, this.parent.clientWidth / this.parent.clientHeight)
        this.renderer = new Renderer(this.parent)
        this.control = new OrbitControls(this.camera, this.parent)
        this.light = new Light()
        this.light.addLight(this.scene)
        app.controllerElement.hang(this.onControlElementChange.bind(this))
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
    public getScene = () => this.scene
    public getCamera = () => this.camera
    public orbitcontrolEnable = (enable: boolean) => {
        this.control.enabled = enable
    }
    public onControlElementChange(element: HTMLElement) {
        this.control.dispose()
        this.control = new OrbitControls(this.camera, element)
    }
}

export { Camera, Renderer, Scene, Light }