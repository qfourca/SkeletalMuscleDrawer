import Bone from "./bone"
import * as THREE from 'three'
export default class UI {
    private parent:HTMLElement
    private buttons:Array<HTMLDivElement> = new Array()
    private boneRotater = new BoneRotate(new THREE.Euler(0, 0, 0))
    private boneSelector: (name:string) => THREE.Bone | undefined = (name: string) => {return undefined}
    public setBoneSelector(func: (name:string) => THREE.Bone | undefined) {
        this.boneSelector = func
    }

    constructor(
        domElement: HTMLElement, 
        buttons: Array<FunctionAndExpression>
    ) {
        this.parent = domElement
        const buttonContainer = document.createElement('div')
        buttonContainer.style.height = '100px'
        buttonContainer.style.width = '50%'
        buttonContainer.style.display = "flex"
        buttonContainer.style.gap = '10px'
        buttonContainer.style.position = "absolute"

        buttons.forEach((element:FunctionAndExpression) => {
            const button = this.button(element)
            this.buttons.push(button)
            buttonContainer.appendChild(button)
        })
        this.parent.appendChild(this.bonePicker())
        this.parent.appendChild(buttonContainer)
    }
    private button(arg:FunctionAndExpression): HTMLDivElement {
        const button = document.createElement('div')
        button.onclick = arg.func
        button.innerText = arg.expression
        button.style.fontSize = "24px"
        button.style.textAlign = 'center'
        button.style.lineHeight = '100px'
        button.style.width = '20%'
        button.style.height = '100px'
        button.style.backgroundColor = "green"
        button.style.cursor = 'pointer'
        return button
    }
    private bonePicker(): HTMLDivElement {
        const container = document.createElement('div')
        // container.style.height = '80%'
        container.style.width = '300px'
        container.style.background = "rgba(10, 150, 100, 0.5)"
        container.style.position = 'absolute'
        container.style.right = '0'
        container.style.display = 'flex'
        container.style.flexDirection = 'column'
        container.style.alignItems = 'center'
        container.style.gap = '15px'

        const boneInfo = document.createElement('div')
        boneInfo.style.width = '80%'
        boneInfo.style.height = '100px'
        boneInfo.style.overflow = 'scroll'
        boneInfo.style.background = 'purple'

        const nameInput = document.createElement('input')
        nameInput.style.height = '20px'
        nameInput.style.width = '80%'
        nameInput.style.marginTop = '10px'
        nameInput.addEventListener('input', (e:Event) => {
            const bone:THREE.Bone | undefined = this.boneSelector(nameInput.value)
            boneInfo.innerText = JSON.stringify(bone)
            if(bone != undefined) {
                this.boneRotater.setBone(bone)
                this.boneRotater.setRotation(bone.rotation)
            }
        })

        container.appendChild(nameInput)
        container.appendChild(boneInfo)
        container.appendChild(this.boneRotater.UI)
        return container
    }
}
class BoneRotate {
    private static XYZ = ['x', 'y', 'z']
    private rotation: THREE.Euler
    public UI: HTMLDivElement
    private bone: THREE.Bone = new THREE.Bone()
    private valueGetter: Array<HTMLInputElement> = new Array()
    private valueSetter: Array<HTMLInputElement> = new Array()
    private isClick: boolean = false
    constructor(rotation: THREE.Euler) {
        this.rotation = rotation
        this.UI = this.makeUI()
        this.setRotation(this.rotation)
        window.addEventListener("mouseup", () => {
            this.isClick = false;
        }, false);
    }
    private makeUI(): HTMLDivElement {
        const container = document.createElement('div')
        container.style.width = '80%'
        container.style.display = 'flex'
        container.style.flexDirection = 'column'
        container.style.alignItems = 'center'
        container.style.gap = '15px'

        BoneRotate.XYZ.forEach((element: string) => {
            const tempGetter = document.createElement('input')
            this.valueGetter.push(tempGetter)
            const tempSetter = document.createElement('input')
            this.valueSetter.push(tempSetter)
            tempSetter.type = 'range'
            tempSetter.min = String(-Math.PI * 2)
            tempSetter.max = String(Math.PI * 2)
            tempSetter.step = '0.001'
            tempSetter.addEventListener("mousedown", (e) => {
                this.isClick = true;
            });
            tempSetter.addEventListener("mousemove", (e) => {
                if (this.isClick) {
                    this.reload()
                }
            });
            tempSetter.addEventListener('change', () => {
                this.reload()
            })
            container.appendChild(tempSetter)
            container.appendChild(tempGetter)
        })
        return container
    }
    public setBone(bone:THREE.Bone) {
        this.bone = bone
    }
    
    public setRotation(rotation: THREE.Euler) {
        this.rotation = rotation
        this.bone.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
        this.rotation.x = Math.round(this.rotation.x * 1000) / 1000
        this.rotation.y = Math.round(this.rotation.y * 1000) / 1000
        this.rotation.z = Math.round(this.rotation.z * 1000) / 1000
        const arr = [
            String(this.rotation.x),
            String(this.rotation.y),
            String(this.rotation.z)
        ]
        arr.forEach((element, idx) => {
            this.valueGetter[idx].value = element
            this.valueSetter[idx].value = element
        })
    }
    private reload() {
        const x = Number.parseFloat(this.valueSetter[0].value)
        const y = Number.parseFloat(this.valueSetter[1].value)
        const z = Number.parseFloat(this.valueSetter[2].value)
        const euler = new THREE.Euler(
            x, y, z
        )
        this.setRotation(euler)
    }
}
export interface FunctionAndExpression {
    func: any
    expression: string
}