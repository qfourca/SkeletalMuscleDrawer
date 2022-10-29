import App from "../../app/app";
import S from './style.scss'
import Component from "../package/component";
import ModalChild from "./modalChild";

export default class Modal extends Component {
    protected html: string = `
        <div class="${S.modalRoot} ${S.modalHide}">
        </div>
    `
    constructor (
        app: App,
        parent: HTMLElement,
    ) {
        super(app, parent)
        this.render()
        this.getAsClassName(S.modalRoot).addEventListener('click', this.modalClick.bind(this))
        app.modal.set({
            component: undefined,
            modalElement: this.getAsClassName(S.modalRoot)
        })
        app.modal.hang(this.onModalChange.bind(this))
    }
    private onModalChange(child: ModalChild) {
        if(child.component != undefined) {
            this.getAsClassName(S.modalRoot).classList.remove(S.modalHide)
        }
        else {
            this.getAsClassName(S.modalRoot).classList.add(S.modalHide)
        }
    }
    private modalClick() {
        if(this.app.modal.get().component?.beforeDestroy()) {
            const temp = { ...this.app.modal.get() }
            temp.component?.destructor()
            temp.component = undefined
            this.app.modal.set(temp)
        }
    }
}

export class ModalMember extends Component{
    constructor (
        app: App
    ) {
        super(app, app.modal.get().modalElement)
    }
    public beforeDestroy(): boolean {
        return true
    }
}