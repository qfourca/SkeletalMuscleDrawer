import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import Core from "../core";
import Model from "./model";

export default class World extends Model {
    private mapSize = 213925620
    protected onLoad(gltf: GLTF): void {
        this.gltf = gltf
        this.body = gltf.scene
        this.body.position.y -= 1
        this.scene.add(this.body)
        Core.core.mapLoading.set(100)
        this.isLoaded.set(true)
    }
    protected onProgress(xhr: any): void {
        Core.core.mapLoading.set(xhr.loaded / this.mapSize)
    }
}