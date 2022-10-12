import UIRoot from "..";
import Component from "../interface/component";
//@ts-ignore
import S from './style.scss'
export default class Modal extends Component {
    public modalBox: Element
    private member?: ModalMember
    protected html: string = `
        <div class="${S.modal}">
        </div>
    `
    constructor (
        parent: HTMLElement
    ) {
        super(parent)
        this.render()
        this.modalBox = this.getAsClassName(S.modal)
        this.modalBox.addEventListener('click', this.modalClick.bind(this))
        this.hide()
    }
    private modalClick() {
        if(this.member != undefined) this.member.onModalClick()
    }
    public hide() {
        this.modalBox.classList.add(S.modal_hide)
        this.modalBox.innerHTML = ""
        this.member = undefined
    }
    public show(member: ModalMember) {
        this.member = member
        this.modalBox.classList.remove(S.modal_hide)
    }
}

export abstract class ModalMember extends Component {
    public abstract onModalClick: () => void
    protected abstract modal: Modal
}