import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import Posture from "../posture";
// import BoneMover from "./boneMover";
import Skeleton from "./skeleton";
import Animation from "../animation";

export default class Human {
    private scene:THREE.Scene
    private body: any
    public skeleton: Skeleton = new Skeleton()
    // private boneMover: BoneMover = new BoneMover(this.skeleton)
    private loading:boolean = true
    private onLoadFunctions:Array<(arg?:any) => any> = new Array()

    constructor(
        file: string,
        scene: THREE.Scene
    ) {
        this.scene = scene
        const loader = new GLTFLoader();
        loader.load(
            file,
            this.onLoad.bind(this),
            this.onProgress.bind(this),
            this.onError.bind(this)
        );
    }
    private onLoad (gltf:any) {
        this.body = gltf.scene
        this.skeleton.setBones(gltf.scene.children[0].children.find((el:any) => el.type === 'Bone'))
        this.onLoadFunctions.forEach(element => { element() })
        this.scene.add(this.body);
        this.loading = false
    }
    private onProgress (xhr:any) {

    }
    private onError (error:any) {
        console.log("Error occur on loading:" + error);
    }
    public update() {

    }
    public execute(func: (arg?:any) => any) {
        if(this.loading) this.onLoadFunctions.push(func)
        else func()
    }

    public getBone(name: string): THREE.Bone | undefined { return this.skeleton.getBone(name) }
    public getBoneNames(): Array<string> { return this.skeleton.getBoneNames() }
    public getPosture(): Array<Posture> { return this.skeleton.getCurrentPosture() }
}
export { Skeleton as Skeleton }