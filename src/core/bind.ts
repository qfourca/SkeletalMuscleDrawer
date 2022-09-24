const bind:Array<bind> = [
    {
        target: "LowerLegR",
        posename: "rightLeg",
        direction: "y",
        delta: (arg: number) => -arg + Math.PI / 2
    },
    {
        target: "LowerLegL",
        posename: "leftLeg",
        direction: "y",
        delta: (arg: number) => arg - Math.PI / 2
    },
    {
        target: "UpperLegR",
        posename: "rightHipY",
        direction: "y",
        // delta: (arg: number) => arg - Math.PI / 2
    },
    {
        target: "UpperLegL",
        posename: "leftHipY",
        direction: "y",
        delta: (arg: number) => -arg
    },
    {
        target: "UpperLegR",
        posename: "rightHipX",
        direction: "x",
        delta: (arg: number) => arg + Math.PI / 2
    },
    {
        target: "UpperLegL",
        posename: "leftHipX",
        direction: "x",
        delta: (arg: number) => arg + Math.PI / 2
    },
    {
        target: "UpperArmR",
        posename: "rightShoulderX",
        direction: "x",
        delta: (arg: number) => arg - 1
    },
    {
        target: "UpperArmL",
        posename: "leftShoulderX",
        direction: "x",
        delta: (arg: number) => arg - 1
    },
    {
        target: "UpperArmR",
        posename: "rightShoulderY",
        direction: "z",
        delta: (arg: number) => -arg + Math.PI
    },
    {
        target: "UpperArmL",
        posename: "leftShoulderY",
        direction: "z",
        delta: (arg: number) => arg - Math.PI
    },
    {
        target: "LowerArmR",
        posename: "rightArm",
        direction: "x",
        delta: (arg: number) => arg - Math.PI
    },
    {
        target: "LowerArmL",
        posename: "leftArm",
        direction: "x",
        delta: (arg: number) => arg - Math.PI
    }
]
export default bind
export interface bind {
    target: string,
    posename: string,
    direction: string,
    delta?: (arg: number) => number
}