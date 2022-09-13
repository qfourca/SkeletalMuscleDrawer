import { Bone } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { LoadAble, RenderAble } from "../interface";
import { 
    Scene
} from "../three";

export default class Human implements LoadAble, RenderAble {
    private body: any
    private bones: Map<string, Bone> = new Map()

    private onLoadFunctions: Array<() => void> = new Array()
    public onLoad = (func: () => any) => { this.onLoadFunctions.push(func); if(!this.getIsLoading()){ func() } }

    private isLoading = true
    public getIsLoading = () => this.isLoading

    constructor(
        file: string
    ) {
        const loader = new GLTFLoader();
        loader.load(
            file,
            this.onLoad_L.bind(this),
            this.onProgress_L.bind(this),
            this.onError_L.bind(this)
        );
    }
    private onLoad_L (gltf:any) {
        this.body = gltf.scene
        this.setBones(this.body.children[0].children.find((el:any) => el.type === 'Bone'))
        // let test: string = '{"postures":['
        // this.bones.forEach(bone => {
        //     test += `{"name":"${bone.name}","rotation":${JSON.stringify(bone.rotation)}},` 
        // })
        // console.log(test)
        this.body.position.y -= 1
        this.isLoading = false
        this.onLoadFunctions.forEach(element => { element() })
    }
    private onProgress_L (xhr:any) {
        // console.log(xhr)
    }
    private onError_L (error:any) {
        console.log("Error occur on loading:" + error);
    }
    private setBones(bone: Bone) {
        this.bones.set(bone.name, bone)
        bone.children.forEach((element:any) => {
            this.setBones(element)
        });
    }

    public render = (parent: Scene) => {
        parent.add(this.body)
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