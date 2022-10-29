import { ModalMember } from "./modal";

export default interface ModalChild {
    component: undefined | ModalMember
    modalElement: HTMLElement
}