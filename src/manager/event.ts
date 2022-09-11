export default class EventManager {
    private events: Map<string, Array<(arg: any) => void>> = new Map()
    constructor (

    ) {

    }
    public add(eventName: string, execute:(arg: any) => void) {
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
    public execute(eventName: string, arg?: any) {
        const get = this.events.get(eventName)
        if(get != undefined) {
            get.forEach((func:(arg: any) => void) => {
                func(arg)
            })
        }
    }
}