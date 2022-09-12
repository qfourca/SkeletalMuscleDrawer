import { LoadAble } from "../../interface";
import Moment from "./moment";
import axios from 'axios'
import Finder from "./finder";
import { Euler } from "three";
import { AppManager } from "../../app";

export default class Animation extends Array<Moment> implements LoadAble {
    private onLoadFunctions: Array<() => void> = new Array()
    public onLoad = (func: () => any) => { this.onLoadFunctions.push(func); if(!this.getIsLoading()){ func() } }

    private isLoading = true
    public getIsLoading = () => this.isLoading

    public finder: Finder

    private appManager: AppManager 
    constructor (
        file: string | any,
        appManager: AppManager
    ) {
        super()
        this.appManager = appManager
        if(typeof file === 'object') {
            this.onResult(file)
        }
        else {
            axios.get(file)
            .then((result) => { this.onResult(result.data) })
            .catch(this.onError.bind(this))
        }
        this.finder = new Finder(this)
    }

    private onResult = (result: RawAnimation) => {
        result.timeline.forEach((element: RawMoment) => {
            const postures: Map<string, Euler> = new Map()
            element.postures.forEach(posture => {
                postures.set(posture.name, posture.rotation)
            })
            this.push({
                postures,
                time: element.time
            })
        })
        this.isLoading = false
        this.onLoadFunctions.forEach(func => { func() })
        this.appManager.eventManager.execute("animation-load", this)
        
    }
    private onError = (error: any) => {

    }
}

interface RawAnimation {
    timeline: Array<RawMoment>
}
interface RawMoment {
    postures: Array<RawPosture>
    time: number
}
interface RawPosture {
    name: string,
    rotation: Euler
}

export  {
    Moment as Moment
}

