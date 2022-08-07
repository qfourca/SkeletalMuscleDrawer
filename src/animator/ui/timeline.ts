
export default class TimeLine {
    constructor(
        parent: HTMLElement,
        option?: Option
    ) {
        const container = document.createElement('div')
        container.style.width = '100%'
        container.style.height = '200px'
        container.style.background = 'black'
        container.style.position = 'absolute'
        container.style.bottom = '0'
        parent.appendChild(container)
    }
}
export interface Option {
    
}