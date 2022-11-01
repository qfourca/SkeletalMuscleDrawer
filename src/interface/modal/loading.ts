import App from "../../app/app";
import S from './loading.style.scss'
import { ModalMember } from "./modal";

export default class LoadingModal extends ModalMember {
    protected html: string = `
        <div class="${S.loadWrapper}">
            <div class="${S.loadCircle}">
            L
            </div>
            <div class="${S.loadCircle}">
            O
            </div>
            <div class="${S.loadCircle}">
            A
            </div>
            <div class="${S.loadCircle}">
            D
            </div>
            <div class="${S.loadCircle}">
            I
            </div>
            <div class="${S.loadCircle}">
            N
            </div>
            <div class="${S.loadCircle}">
            G
            </div>
        </div>
    `
    constructor (
        app: App
    ) {
        super(app)
        this.render()
    }
    public beforeDestroy(): boolean {
        return false
    }
}