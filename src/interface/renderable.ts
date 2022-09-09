import {
    Scene
} from 'three'

type RenderParent = HTMLElement & Scene
export default interface RenderAble {
    render: (parent: RenderParent) => void
}