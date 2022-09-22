interface joint {

}
const joints: Map<string, Array<number>> = new Map([
    ["leftArm", [11, 13, 15]],
    ["rightArm", [12, 14, 16]],
    ["leftLeg", [23, 25, 27]],
    ["rightLeg", [24, 26, 28]],
])

export default joints
export {
    joint as joint
}