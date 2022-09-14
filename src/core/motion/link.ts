import { Vector3 } from "three"

const bones: Array<boneInfo> = [
    {
        parent: 11,
        child: 13,
        name: "UpperArmL"
    },
    {
        parent: 13,
        child: 15,
        name: "LowerArmL"
    },
    {
        parent: 11,
        child: 23,
        name: "SpineL"
    },
    {
        parent: 23,
        child: 25,
        name: "UpperLegL"
    },
    {
        parent: 25,
        child: 27,
        name: "LowerLegL"
    },
    {
        parent: 27,
        child: 29,
        name: "HeelL"
    },
    {
        parent: 27,
        child: 31,
        name: "TopFootL"
    },
    {
        parent: 29,
        child: 31,
        name: "BottomFootL"
    },

    {
        parent: 23,
        child: 24,
        name: "Hips"
    },
    {
        parent: 11,
        child: 12,
        name: "Shoulder"
    },
    {
        parent: 12,
        child: 14,
        name: "UpperArmR"
    },
    {
        parent: 14,
        child: 16,
        name: "LowerArmR"
    },
    {
        parent: 12,
        child: 24,
        name: "SpineR"
    },
    {
        parent: 24,
        child: 26,
        name: "UpperLegR"
    },
    {
        parent: 26,
        child: 28,
        name: "LowerLegR"
    },
    {
        parent: 28,
        child: 30,
        name: "HeelR"
    },
    {
        parent: 28,
        child: 32,
        name: "TopFootR"
    },
    {
        parent: 30,
        child: 32,
        name: "BottomFootR"
    },
]
export default bones

export interface boneInfo {
    name: string
    parent: number
    child: number
    origin?: Vector3
}