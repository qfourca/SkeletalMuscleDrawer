export interface Hookable<T> {
    get: () => T
    set: (arg: T) => void
    hang: (func: () => void) => void
    rise: (func: () => void) => number
}

export default class Hook<T> implements Hookable<T> {
    private value: T
    private onQueue: Array<(arg: T) => void> = new Array()
    constructor (
        start: T
    ) {
        this.value = start
    }
    public get = () => this.value
    public set = (arg: T) => {
        this.value = arg
        this.onQueue.forEach((func: (arg: T) => void) => { func(this.value) })
    }
    public hang = (func: (arg: T) => void) => { this.onQueue.push(func) }
    public rise = (func: () => void) => {
        let remove: number = 0
        for(let i = 0; i < this.onQueue[i].length; i++) {
            if(this.onQueue[i] === func)  {
                this.onQueue.splice(i, 1);
                i--;
                remove++;
            }
          }
        return remove
    }
}