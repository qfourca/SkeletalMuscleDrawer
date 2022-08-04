import BoneRotate from './boneRotate'
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
export interface FunctionAndExpression {
    func: any
    expression: string
}