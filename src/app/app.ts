import Hook from "../hook"
import { Member } from "./"
import Animation, { RawAnimation } from "../animation"
import axios, { AxiosResponse } from "axios"
import Engine from "../engine/engine"
import UI from "../interface/ui"
import { AnalysisData, AnalysisSetting } from "../analysis"
import ModalChild from "../interface/modal/modalChild"
import Analysis from "../analysis/analysis"
import Controller from "../controller"

export default class App {
    public currentTime: Hook<number>
    public updateClock: Hook<number>
    public rootElement: Hook<HTMLElement>
    public isPaused: Hook<boolean>
    public isLoading: Hook<boolean>
    public animation: Hook<Animation>
    public subtitle: Hook<string>
    public analysisSetting: Hook<AnalysisSetting>
    public analysisData: Hook<AnalysisData>
    public modal: Hook<ModalChild>
    public human: Hook<string>
    public world: Hook<string>

    private members: Array<Member> = new Array()
    constructor (
        root: HTMLElement,
        human: string,
        world: string
    ) {
        this.currentTime = new Hook(0)
        this.updateClock = new Hook(0)
        this.rootElement = new Hook(root)
        this.isPaused = new Hook(false)
        this.isLoading = new Hook(true)
        this.animation = new Hook(new Animation(dummyAnimation))
        this.subtitle = new Hook("")
        this.analysisSetting = new Hook(dummyAnalysisInfo)
        this.analysisData = new Hook(dummyAnalysisData)
        this.modal = new Hook(dummyModal)
        this.human = new Hook(human)
        this.world = new Hook(world)

        this.members.push(new Engine(this))  
        this.members.push(new UI(this))
        this.members.push(new Analysis(this))
        this.members.push(new Controller(this))  
    }
    public animate (
        animation: string | RawAnimation
    ) {
        if(typeof animation === "string") {
            axios.get(animation)
            .then((result: AxiosResponse) => {
                this.animation.set(result.data)
            })
        }
        else if(typeof animation === "object") {
            this.animation.set(new Animation(animation))
        }
    }
}

const dummyAnimation: RawAnimation = {
    name: "dummy",
    animations: [],
    timeline: [],
    subtitles: []
}
const dummyAnalysisInfo: AnalysisSetting = {
    isWorking: false,
    videoSrc: "",
    videoElement: document.createElement('video')
}
const dummyAnalysisData: AnalysisData = {
    buffer: {
        poseWorldLandmarks: new Array(),
        poseAngles: new Map(),
        image: document.createElement('canvas') 
    },
    goal: 0,
    history: new Array()
}
const dummyModal: ModalChild = {
    component: undefined,
    modalElement: document.createElement('div')
}