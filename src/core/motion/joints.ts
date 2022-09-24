interface joint {

}
const joints: Map<string, Array<number>> = new Map([
    ["leftArm", [11, 13, 15]],
    ["rightArm", [12, 14, 16]],
    ["leftLeg", [23, 25, 27]],
    ["rightLeg", [24, 26, 28]],
    ["leftHipY", [25, 23, 24]],
    ["rightHipY", [26, 24, 23]],
    ["leftHipX", [11, 23, 25]],
    ["rightHipX", [12, 24, 26]],
    ["leftShoulderX", [13, 11, 23]],
    ["rightShoulderX", [14, 12, 24]],
    ["leftShoulderY", [13, 11, 12]],
    ["rightShoulderY", [14, 12, 11]],
])

export default joints
export {
    joint as joint
}