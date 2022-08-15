import UIRoot from "../../ui";
export default class Picker extends UIRoot{ 
    private input: HTMLInputElement
    private select: HTMLSelectElement
    private options: Array<string> = new Array()
    private onChange: (arg: string) => void
    constructor(
        parent: HTMLElement,
        onChange: (arg: string) => void
    ) {
        super(parent)
        this.element.className = 'picker-container'

        this.input = document.createElement('input')
        this.append(this.input)
        this.input.addEventListener('input', () => {
            if(this.options.includes(this.input.value)) {
                this.select.value = this.input.value
            }
            this.onChange(this.input.value)
        })
        this.select = document.createElement('select')
        this.append(this.select)
        this.select.addEventListener('change', () => {
            this.input.value = this.select.value
            this.onChange(this.select.value)
        })
        this.onChange = onChange
    }
    public setOptions(options: Array<string>) {
        this.options = options
        while (this.select.firstChild != undefined) {
            this.select.removeChild(this.select.firstChild);
        }
        this.options.forEach(element => {
            const option = document.createElement('option')
            option.value = element
            option.innerText = element
            this.select.appendChild(option)
        })
    }
}