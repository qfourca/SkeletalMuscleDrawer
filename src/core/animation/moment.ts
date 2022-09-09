import { Euler } from "three";

export default interface Moment {
    postures: Map<string, Euler>
    time: number
}