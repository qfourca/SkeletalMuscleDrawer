import { Controller, Option } from "../state";
export default class App extends Controller {
    private scene;
    private three;
    private core;
    constructor(parent: HTMLElement, human: string, animation: string | any, option?: Option);
    update(): void;
}
export { Option as Option };
