import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as Core from './core'
export default class App {
    private scene:Core.Scene
    private camera:Core.Camera
    private renderer:Core.Renderer

    private control:OrbitControls
    constructor(width: number, height: number) {
        this.scene = new Core.Scene()
        this.camera = new Core.Camera(95, width / height)
        this.renderer = new Core.Renderer(window.innerWidth, window.innerHeight, document.body)

        const light = new THREE.AmbientLight(0xffffff, 1)
        this.scene.add(light)

        const loader = new GLTFLoader();
        loader.load(
            './human.gltf',
             ( gltf ) => {
                this.scene.add( gltf.scene );
                 gltf.scene.scale.set(10, 10, 10)
                console.log(gltf.scene)
            },
            ( xhr ) => {
                // console.log( Math.round(xhr.loaded / 4783071 * 100) + '%');
            },
            ( error ) => {
                console.log("Error occur on loading:" + error);
            }
        );
        this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.update()
    }
    update() {
        requestAnimationFrame(this.update.bind(this))
        this.control.update()
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
