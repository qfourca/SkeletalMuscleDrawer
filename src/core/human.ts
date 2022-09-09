import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { LoadAble, RenderAble } from "../interface";
import { 
    Scene
} from "../three";

export default class Human implements LoadAble, RenderAble {
    private body: any

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

    public render = (parent: Scene) => {
        parent.add(this.body)
    }
}