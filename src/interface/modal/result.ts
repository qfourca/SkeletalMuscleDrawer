import Core from "../../core";
import Modal from "./modal";
import modal, { ModalMember } from "./modal";
//@ts-ignore
import S from './style.scss'
export default class ResultModal extends ModalMember {
    protected modal: modal;
    public onModalClick: () => void = () => {
        this.modal.hide()
    };
    protected html: string = `
        <div class="${S.resultContainer}">
            <div class="${S.title}">
                결과
            </div>
            <div class="${S.score}">
                sadasasdas
            </div>
            <div class="${S.result}">
                sdasdsdasd
            </div>
        </div>
    `;
    constructor(
        modal: Modal,
        result: number,
        score: number,
    ) {
        super(modal.modalBox)
        this.render() 
        this.modal = modal
        this.getAsClassName(S.result).innerHTML = `${result} / ${result} 회`
        this.getAsClassName(S.score).innerHTML = String(score) + "점"
    }
}