import * as Core from './core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { UI as UIType, AnimationUI, ProductionUI } from './ui'
import Human from "./human";
import Animation from './animation';
import axios from 'axios';
//@ts-ignore
import human from './static/asset/human.gltf'
export default class App {
    private scene:Core.Scene
    private camera:Core.Camera
    private renderer:Core.Renderer
    private light:Core.Light
    private control:OrbitControls

    private parent:HTMLElement
    private human:Human
    private animation:Animation

    private option:Option

    private ui: UIType

    constructor(
        domElement: HTMLElement,
        humanUrl: string,
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
        
        this.human = new Human(human, this.scene)
        this.animation = new Animation()

        window.addEventListener('resize', this.resize.bind(this), false)
        
        if(this.option.UI === UI.animation) this.ui = new AnimationUI(this.parent, this.human)
        else if(this.option.UI === UI.production) this.ui = new ProductionUI(this.parent, this.animation)
        else this.ui = new ProductionUI(this.parent, this.animation)
        this.ui.render()
        
        this.update()
    }
    private update() {
        requestAnimationFrame(this.update.bind(this))
        this.control.update()
        this.ui.update()
        this.animation.update()
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
    public animate(animation: string | any) {
        if(typeof animation == 'string') {
            this.human.execute(() => { 
                axios.get(animation)
                .then((result) => {
                    this.animation.setValue(result.data.timeLine)
                    this.animation.animate(this.human.skeleton)
                })
                .catch(() => {
                    console.error('animation loading error')
                })
            })
        }
        else {
            this.human.execute(() => {
                this.animation.setValue(animation.timeLine)
                this.animation.animate(this.human.skeleton)
            })
        }
        
    }
}

export interface Option {
    UI?: number
}
export const UI = {
    production: 0,
    animation: 1
}