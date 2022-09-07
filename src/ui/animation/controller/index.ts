import * as THREE from 'three'
import { Moment } from '../../../animation'
import Posture from '../../../animation/posture'
import Animator from '../../../animator'
import Human from '../../../human'
import UIRoot from '../../ui'
import Picker from './picker'
import Rotator from './rotator'
export default class Controller extends UIRoot {
    private static XYZ = ['x', 'y', 'z']
    private boneInfo: HTMLElement
    private human: Human
    private bone: THREE.Bone | undefined
    private picker: Picker
    private rotatorContainer: HTMLElement
    private rotators: Array<Rotator> = new Array()
    private getPicked: () => Moment
    private animator: Animator
    constructor (
        parent: HTMLElement,
        human: Human,
        animatior: Animator,
        getPicked: () => Moment
    ) {
        super(parent)
        this.element.className = 'controller'
        this.animator = animatior
        this.human = human
        this.getPicked = getPicked
        this.picker = new Picker(this.element, this.reload.bind(this))
        this.picker.render()
        this.human.execute(() => {
            this.picker.setOptions(this.human.getBoneNames())
        })

        this.boneInfo = document.createElement('div')
        this.boneInfo.className = 'bone-info'
        this.append(this.boneInfo)

        this.rotatorContainer = document.createElement('div')
        this.rotatorContainer.className = 'rotator-container'

        Controller.XYZ.forEach(element => {
            this.rotators.push(new Rotator(this.rotatorContainer, this.bone?.rotation, element))
        })
        this.rotators.forEach(element => {
            element.render()
        })
        this.append(this.rotatorContainer)
    }

    private reload(boneName: string) {
        this.bone = this.human.getBone(boneName)
        if(this.bone != undefined) {
            const find = this.getPicked().postures.find(element => element.name === this.bone?.name)
            if(find == undefined) {
                this.getPicked().postures.push(new Posture(this.bone.name, this.animator.getAnimation().getRootPosture(String(this.animator.getMomentIdx(this.getPicked()))).rotation))
                this.rotators.forEach(element => element.setTarget(this.getPicked().postures.find(element => element.name === this.bone?.name)!.rotation))
            }
            else {
                this.rotators.forEach(element => element.setTarget(find.rotation))
            }
            this.boneInfo.innerText = JSON.stringify(this.bone)
        }
        else {
            this.boneInfo.innerText = ""
        } 
    }
}