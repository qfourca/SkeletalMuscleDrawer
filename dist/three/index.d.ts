import Camera from "./Camera";
import Renderer from "./Renderer";
import Scene from "./Scene";
import Light from "./Light";
export default class Three {
    private scene;
    private camera;
    private renderer;
    private light;
    private control;
    private parent;
    constructor(parent: HTMLElement);
    update: () => void;
    render: () => void;
    getScene: () => Scene;
    private resize;
}
export { Camera, Renderer, Scene, Light };
