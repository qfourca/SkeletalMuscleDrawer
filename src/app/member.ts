import App from "./app";

export default class Member {
    protected app: App
    constructor (
        app: App
    ) {
        this.app = app
    }
}