declare module "*.scss" {
    const content: { [className: string]: string };
    export = content;
}
declare module "*.glb" {
    const content: string;
    export = content
}
declare module "*.gltf" {
    const content: string;
    export = content
}

declare module "*.svg" {
    const content: string;
    export default content;
}

declare module "*.png" {
    const content: string;
    export default content;
}
declare module "*.mp4" {
    const content: string;
    export default content;
}