import Moment from "./moment";
import Finder from "./finder";
export default class Animation extends Array<Moment> {
    private onLoadFunctions;
    onLoad: (func: () => any) => void;
    private isLoading;
    getIsLoading: () => boolean;
    finder: Finder;
    constructor(file: string | any);
    private onResult;
    private onError;
}
export { Moment as Moment };
