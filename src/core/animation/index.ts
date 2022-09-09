import { LoadAble } from "../../interface";
import Moment from "./moment";
import axios from 'axios'

export default class Animation extends Array<Moment> implements LoadAble {
    private onLoadFunctions: Array<() => void> = new Array()
    public onLoad = (func: () => any) => { this.onLoadFunctions.push(func); if(!this.getIsLoading()){ func() } }

    private isLoading = true
    public getIsLoading = () => this.isLoading

    constructor (
        file: string | any
    ) {
        super()
        if(typeof file === 'object') {
            this.onResult(file)
        }
        else {
            axios.get(file)
            .then((result) => { this.onResult(result.data) })
            .catch(this.onError.bind(this))
        }
    }

    private onResult = (result: RawAnimation) => {
        console.log(result)
        result.timeline.forEach((element: Moment) => {
            this.push(element)
        })
        this.isLoading = false
        this.onLoadFunctions.forEach(func => { func() })
    }
    private onError = (error: any) => {

    }
}

interface RawAnimation {
    timeline: Array<Moment>
}

export  {
    Moment as Moment
}

