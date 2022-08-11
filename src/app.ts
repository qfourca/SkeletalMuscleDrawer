import * as Core from './core'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Human from "./human";
import { UI as UIType, Animation, Production } from './ui'
import TimeLine from './timeline';
export default class App {
    private scene:Core.Scene
    private camera:Core.Camera
    private renderer:Core.Renderer
    private light:Core.Light
    private control:OrbitControls

    private parent:HTMLElement
    private human:Human
    private option:Option

    private ui?: UIType

    constructor(
        domElement: HTMLElement,
        file: string,
        option?: Option
    ) {
        this.parent = domElement
        this.option = option == undefined ? { } : option
        
        this.scene = new Core.Scene()
        this.camera = new Core.Camera(95, this.parent.clientWidth / this.parent.clientHeight)
        this.renderer = new Core.Renderer(this.parent.clientWidth, this.parent.clientHeight, this.parent)
        this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.light = new Core.Light()
        this.light.addLight(this.scene)
        
        this.human = new Human(file, this.scene)
        this.update()

        window.addEventListener('resize', this.resize.bind(this), false)
        
        if(this.option.UI === UI.animation) this.ui = new Animation(this.parent, this.human)
        else if(this.option.UI === UI.production) this.ui = new Production(this.parent)
        else this.ui = new Production(this.parent)

    }

    private update() {
        requestAnimationFrame(this.update.bind(this))
        this.control.update()
        this.human.update()
        this.render()
    }
    private resize() {
        this.camera.aspect = this.parent.clientWidth / this.parent.clientHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.parent.clientWidth, this.parent.clientHeight)
        this.render()
    }
    private render() {
        this.renderer.render(this.scene, this.camera)
    }
    public animate(timeLine: TimeLine) {
        this.human.execute(() => { this.human.animate(timeLine) })
    }
}

export interface Option {
    UI?: number
}
export const UI = {
    production: 0,
    animation: 1
}