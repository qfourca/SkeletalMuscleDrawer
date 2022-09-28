import { Bone } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { 
    Scene
} from "../three";

export default class Human {
    private scene: Scene
    private body: any
    private bones: Map<string, Bone> = new Map()
    private isLoading = true
    public getIsLoading = () => this.isLoading

    constructor(
        file: string,
        scene: Scene
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
        this.setBones(this.body.children[0].children.find((el:any) => el.type === 'Bone'))
        this.body.position.y -= 1
        console.log(gltf)
        this.scene.add(this.body)
    }
    private onProgress (xhr:any) {
        // console.log(xhr)
    }
    private onError (error:any) {
        console.log("Error occur on loading:" + error);
    }
    private setBones(bone: Bone) {
        this.bones.set(bone.name, bone)
        bone.children.forEach((element:any) => {
            this.setBones(element)
        });
    }
    public getBone(name: string): Bone | undefined {
        return this.bones.get(name)
    }

    private readonly BalckList = [
        "Finger",
        "Eyebrow"
    ]
    public getBoneNames(): Array<string> {
        const result = new Array()
        this.bones.forEach((value: Bone, key: string) => {
            let black: boolean = false
            this.BalckList.forEach((s: string) => {if(key.includes(s)) black = true})
            if(!black)
                result.push(key)
        })
        return result
    }
}