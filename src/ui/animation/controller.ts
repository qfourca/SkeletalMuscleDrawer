import * as THREE from 'three'
import BoneRotate from "./boneRotate"
export default class Controller {
    private boneRotater = new BoneRotate(new THREE.Euler(0, 0, 0))
    private optionContainer: HTMLSelectElement = document.createElement('select')
    
    private getBone: (name:string) => THREE.Bone | undefined = () => undefined
    public setBone(func: (name:string) => THREE.Bone | undefined) { this.getBone = func }
    private options: Array<string> = new Array()
    public setOption(a: Array<string>) { this.options = a; }
    constructor (
        parent: HTMLElement
    ) {
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
        parent.appendChild(container)
    }

    private pickBone(name: string): string {
        const bone:THREE.Bone | undefined = this.getBone(name)
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