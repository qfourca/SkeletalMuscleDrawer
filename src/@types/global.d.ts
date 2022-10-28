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