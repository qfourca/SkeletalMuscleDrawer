import BoneRotate from './boneRotate'
import * as THREE from 'three'
export default class UI {
    private parent:HTMLElement
    private buttons:Array<HTMLDivElement> = new Array()
    private boneRotater = new BoneRotate(new THREE.Euler(0, 0, 0))
    private optionContainer: HTMLSelectElement = document.createElement('select')
    private boneSelector: (name:string) => THREE.Bone | undefined = (name: string) => {return undefined}
    public setBoneSelector(func: (name:string) => THREE.Bone | undefined) { this.boneSelector = func }

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
            boneInfo.innerText = this.pickBone(nameInput.value)
        })
        
        const nameSelect = document.createElement('select')
        nameSelect.style.height = '20px'
        nameSelect.style.width = '80%'
        nameSelect.style.marginTop = '10px'
        this.optionContainer = nameSelect

        nameSelect.addEventListener('change', () => {
            boneInfo.innerText = this.pickBone(nameSelect.value)
            nameInput.value = nameSelect.value
        })

        container.appendChild(nameInput)
        container.appendChild(nameSelect)
        container.appendChild(boneInfo)
        container.appendChild(this.boneRotater.UI)
        return container
    }

    private pickBone(name: string): string {
        const bone:THREE.Bone | undefined = this.boneSelector(name)
        if(bone != undefined) {
            this.boneRotater.setBone(bone)
            this.boneRotater.setRotation(bone.rotation)
        }
        return JSON.stringify(bone)
    }

    public setOptions(options: Array<string>) {
        while (this.optionContainer.hasChildNodes()) {
            this.optionContainer.removeChild(this.optionContainer.firstChild!);
        }
        options.forEach(element => {
            const option = document.createElement('option')
            option.value = element
            option.innerText = element
            this.optionContainer.appendChild(option)
        })
    }
}
export interface FunctionAndExpression {
    func: any
    expression: string
}