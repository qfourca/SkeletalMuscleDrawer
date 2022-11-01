import App from "../app/app";
import Member from "../app/member";
import LoadingModal from "../interface/modal/loading";

export default class Loading extends Member {
    constructor (
        app: App
    ) {
        super(app)
        this.app.isLoading.hang(this.onLoadChange.bind(this))
        this.app.isLoading.set(this.app.isLoading.get())
    }
    private onLoadChange(isLoading: boolean) {
        if(isLoading) {
            if(this.app.modal.get().component === undefined) {
                const temp = { ...this.app.modal.get() }
                temp.component = new LoadingModal(this.app)
                this.app.modal.set(temp)
            }
        }
        else {
            const temp = { ...this.app.modal.get() }
            temp.component?.destructor()
            temp.component = undefined
            this.app.modal.set(temp)
        }
    }
}