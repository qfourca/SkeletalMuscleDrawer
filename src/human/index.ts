import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import Posture from "../posture";
import BoneMover from "./boneMover";
import TimeLine from "../timeline";

export default class Human {
    private scene:THREE.Scene
    private body: any
    private boneMover: BoneMover = new BoneMover()
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
        this.boneMover.setBones(gltf.scene.children[0].children.find((el:any) => el.type === 'Bone'))
        this.onLoadFunctions.forEach(element => { element() })
        this.scene.add(gltf.scene);
        this.loading = false
    }
    private onProgress (xhr:any) {
    }
    private onError (error:any) {
        console.log("Error occur on loading:" + error);
    }
    public update() {
        if(!this.loading) {
            this.boneMover.update()
        }
    }
    public executeOnLoad(func: (arg?:any) => any) {
        if(this.loading) this.onLoadFunctions.push(func)
        else func()
        
    }
    public animate(timeLine: TimeLine) {
        this.boneMover.animate(timeLine)
    }
    public selectBone(name: string): THREE.Bone | undefined {
        return this.boneMover.bones.get(name)
    }
    public getBones(): Array<string> {
        let result = new Array()
        this.boneMover.bones.forEach((val: THREE.Bone, key: string) => {
            result.push(key)
        })
        return result
    }
    public getPosture(): Array<Posture> {
        return this.boneMover.posture
    }
    public isLoading() {
        return this.loading
    }

}