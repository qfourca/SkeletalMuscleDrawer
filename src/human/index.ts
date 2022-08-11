import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import Posture from "../posture";
import BoneMover from "./boneMover";
import Skeleton from "./skeleton";
import TimeLine from "../timeline";

export default class Human {
    private scene:THREE.Scene
    private body: any
    private skeleton: Skeleton = new Skeleton()
    private boneMover: BoneMover = new BoneMover(this.skeleton)
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
        if(!this.loading) {
            this.boneMover.update()
        }
    }
    public execute(func: (arg?:any) => any) {
        if(this.loading) this.onLoadFunctions.push(func)
        else func()
    }
    public animate(timeLine: TimeLine) {
        this.boneMover.animate(timeLine)
    }

    public getBone:(name: string) => THREE.Bone | undefined = this.skeleton.getBone
    public getBoneNames:() => Array<string> = this.skeleton.getBoneNames
    public getPosture: () => Array<Posture> = this.skeleton.getCurrentPosture
}