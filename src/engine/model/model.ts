import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import Hook from '../../hook';
export default class Model {
    private fileName: string
    public isLoading: Hook<boolean>;
    public body?: GLTF;
    constructor(
        fileName: string
    ) {
        this.fileName = fileName
        this.isLoading = new Hook(true)
        const gltfLoader = new GLTFLoader()
        gltfLoader.load(fileName,
            this.onLoad.bind(this),
            this.onProgress.bind(this),
            this.onError.bind(this))
    }
    protected onLoad(model:GLTF) {
        this.body = model;
        this.isLoading.set(false)
    }
    protected onProgress(progress:any) {
        
    }
    protected onError(error:any) {
        console.log(error)
    }
}