import * as THREE from 'three'
export default class BoneRotate {
    private static XYZ = ['x', 'y', 'z']
    private rotation: THREE.Euler
    public UI: HTMLDivElement
    private bone: THREE.Bone = new THREE.Bone()
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
            const typeSetter = document.createElement('input')
            const rangeSetter = document.createElement('input')
            
            rangeSetter.type = 'range'
            rangeSetter.min = String(-Math.PI * 2)
            rangeSetter.max = String(Math.PI * 2)
            rangeSetter.step = '0.001'
            
            this.valueSetter.push(rangeSetter)
            this.valueSetter.push(typeSetter)
            container.appendChild(rangeSetter)
            container.appendChild(typeSetter)
        })
        this.valueSetter.forEach((element, idx) => {
            element.addEventListener("mousedown", () => this.isClick = true) 
            element.addEventListener("mousemove", () => { if (this.isClick) this.reload(idx) }) 
            element.addEventListener('change', () => this.reload(idx))
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
        arr.forEach((element, idx: number) => {
            idx = (idx + 1) * 2
            this.valueSetter[idx - 1].value = element
            this.valueSetter[idx - 2].value = element
        })
    }
    private reload(idx: number) {
        const changeVal = Number.parseFloat(this.valueSetter[idx].value)
        let euler
        if(idx == 0 || idx == 1) {
            euler = new THREE.Euler(changeVal, this.rotation.y, this.rotation.z)
        }
        else if(idx == 2 || idx == 3) {
            euler = new THREE.Euler(this.rotation.x, changeVal, this.rotation.z)
        }
        else {
            euler = new THREE.Euler(this.rotation.x, this.rotation.y, changeVal)
        }
        this.setRotation(euler)
    }
}