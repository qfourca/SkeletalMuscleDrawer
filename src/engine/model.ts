import { Bone } from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Core from "../core";
import Hook from "../hook";
import { Scene } from "../three";

export default class Model {
    protected scene: Scene
    protected body: any
    protected gltf?: GLTF
    public isLoaded: Hook<boolean> = new Hook(false)
    constructor(
        file: string
    ) {
        this.scene = Core.core.scene.get()
        const loader = new GLTFLoader();
        loader.load(
            file,
            this.onLoad.bind(this),
            this.onProgress.bind(this),
            this.onError.bind(this)
        );
    }
    protected onLoad (gltf: GLTF) {
        this.gltf = gltf
        this.body = gltf.scene
        this.body.position.y -= 1
        this.scene.add(this.body)
        this.isLoaded.set(true)
    }
    protected onProgress (xhr:any) {
        // console.log(xhr)
    }
    protected onError (error:any) {
        console.log("Error occur on loading:" + error);
    }
}