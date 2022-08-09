import * as Core from './core'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Human from "./human";
import { UI as UIType, Animation } from './ui'
import TimeLine from './timeline';
export default class App {
    private scene:Core.Scene
    private camera:Core.Camera
    private parent:HTMLElement
    private human:Human

    private renderer:Core.Renderer
    private control:OrbitControls
    private option:Option

    private ui?: UIType

    constructor(
        domElement: HTMLElement,
        file: string,
        option?: Option
    ) {
        this.parent = domElement
        this.scene = new Core.Scene()
        this.camera = new Core.Camera(95, this.parent.clientWidth / this.parent.clientHeight)
        this.renderer = new Core.Renderer(this.parent.clientWidth, this.parent.clientHeight, this.parent)
        this.scene.add(new THREE.DirectionalLight(0xffffff, 1))
        this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.human = new Human(file, this.scene)
        this.option = option == undefined ? { } : option
        this.update()
        window.addEventListener('resize', this.resize.bind(this), false)
        
        if(this.option.UI === UI.animation) this.ui = new Animation(this.parent, this.human)
        
    }

    private update() {
        requestAnimationFrame(this.update.bind(this))
        this.control.update()
        this.human.update()
        this.render()
    }
    public resize() {
        this.camera.aspect = this.parent.clientWidth / this.parent.clientHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.parent.clientWidth, this.parent.clientHeight)
        this.render()
    }
    public isloading() {
        return this.human.isLoading()
    }
    private render() {
        this.renderer.render(this.scene, this.camera)
    }
    public animate(timeLine: TimeLine) {
        this.human.executeOnLoad(() => { this.human.animate(timeLine) })
    }
}

export interface Option {
    UI?: number
}
export const UI = {
    production: 0,
    animation: 1
}