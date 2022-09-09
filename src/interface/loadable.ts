export default interface LoadAble {
    getIsLoading: () => boolean
    onLoad: (func: () => any) => void
}