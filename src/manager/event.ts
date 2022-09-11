export default class EventManager {
    private events: Map<string, Array<() => void>> = new Map()
    constructor (

    ) {

    }
    public add(eventName: string, execute:() => void) {
        const get = this.events.get(eventName)
        if(get != undefined) {
            get.push(execute)
        }
        else {
            const array = new Array()
            array.push(execute)
            this.events.set(eventName, array)
        }
    }
    public execute(eventName: string) {
        const get = this.events.get(eventName)
        if(get != undefined) {
            get.forEach((func:() => void) => {
                func()
            })
        }
    }
}