import Core from "../../core";
import Modal from "./modal";
import modal, { ModalMember } from "./modal";
import ResultModal from "./result";
//@ts-ignore
import S from './style.scss'
export default class ProgressModal extends ModalMember {
    protected modal: modal;
    public onModalClick: () => void = () => {
        // this.modal.hide()
    };
    protected html: string = `
        <div class="${S.mapLoadingContainer}">
            <div class="${S.PrgressContainer}">
                <div class="${S.Progress}">
                
                </div>
            </div>
            <h2 class="${S.Percent}">50%</h2>
            <h4>LOADING...</h4>
        </div>
    `;
    constructor(
        modal: Modal
    ) {
        super(modal.modalBox)
        this.render() 
        this.modal = modal
        Core.core.mapLoading.hang(this.onMapLoad.bind(this))
    }
    private onMapLoad(state: number) {
        //@ts-ignore
        this.getAsClassName(S.Progress).style.width = state * 100 + "%"
        this.getAsClassName(S.Percent).innerHTML = Math.round(state * 100) + "%"
        if(state === 100) {
            this.modal.hide()
        }
    }
}