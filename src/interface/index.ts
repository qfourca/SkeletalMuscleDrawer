import Modal, { ModalMember } from "./modal/modal";
import Component from "./interface/component";
//@ts-ignore
import S from './style.scss'
import TimeLine from "./timeline";
import ProgressModal from "./modal/progress";
export default class UIRoot extends Component {
    public static Root: UIRoot
    protected html: string = ``
    private modal: Modal
    public element: HTMLDivElement
    constructor (
        root: HTMLElement
    ) {
        Component.root = root
        super(root)
        this.element = document.createElement('div')
        this.element.className = S.UIRoot
        root.appendChild(this.element)

        this.appendChild(new TimeLine(this.element))
        this.modal = new Modal(this.element)
        this.appendChild(this.modal)
        this.appendModal(new ProgressModal(this.modal))
        UIRoot.Root = this
    }
    public appendModal(constructor: ModalMember) {
        this.modal.show(constructor)
    }
    public getModal = () => this.modal
}
// class test extends Component {
//     protected html: string = `<div></div>`;
//     constructor (
//         parent: Element
//     ) {
//         super(parent)
//         this.render()
//     }
// }