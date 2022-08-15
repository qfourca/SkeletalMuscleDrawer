import * as THREE from 'three'
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
    
    constructor (
        parent: HTMLElement,
        human: Human
    ) {
        super(parent)
        this.element.className = 'controller'
        this.human = human

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
        this.boneInfo.innerText = JSON.stringify(this.bone)
        this.rotators.forEach(element => element.setTarget(this.bone?.rotation))
    }
}