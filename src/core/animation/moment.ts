import { Euler } from "three";

export default interface Moment {
    posture: Map<string, Euler>
    time: number
}