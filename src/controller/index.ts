import App from "../app/app";
import Member from "../app/member";
import Loading from "./loading";
import Subtitle from "./subtitle";
import Timer from "./timer";

export default class Controller extends Member {
    private members: Array<Member>
    constructor (
        app: App
    ) {
        super(app)
        this.members = new Array()
        this.members.push(new Loading(this.app))
        this.members.push(new Subtitle(this.app))
        this.members.push(new Timer(this.app))
    }
}