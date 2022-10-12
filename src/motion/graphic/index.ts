import { Vector3 } from 'three'
import Point from './point'
import { NormalizedLandmark, NormalizedLandmarkList } from '@mediapipe/pose'
import Line from './line'
import link, { boneInfo } from './link'
import { Scene } from '../../three'
export default class Graphic {
    private scene: Scene

    private link: Array<boneInfo> = new Array()
    private points: Array<Point> = new Array()
    private lines: Array<Line> = new Array()
    constructor (
        scene: Scene
    ) {
        this.scene = scene
        this.link = link
        for(let i = 0; i < 33; i++) {
            this.points.push(new Point(new Vector3(0, 0, 0)))
            this.points[i].render(this.scene)
        }
        this.link.forEach((element) => {
            const line = new Line()
            this.lines.push(line)
            line.render(this.scene)
        })
    }
    public set(positions: NormalizedLandmarkList) {
        this.setPoints(positions)
        this.setBone(positions)
    }
    private setBone(positions: NormalizedLandmarkList) {
        this.link.forEach((element, idx) => {
            this.lines[idx].set([
                Graphic.LandmarkToVec3(positions[element.parent]),
                Graphic.LandmarkToVec3(positions[element.child]),
            ])
        })
    }
    private setPoints(positions: NormalizedLandmarkList) {
        this.points.forEach((element: Point, idx: number) => {
            let color: number;
            if(positions[idx].visibility === undefined) {
                color = 0xFF0000
            }
            else if(positions[idx].visibility! < 0.9) {
                color = 0xFF0000
            }
            else {
                color = 0x00AA00
            }
            element.set(
                Graphic.LandmarkToVec3(positions[idx]),
                color
            )
        })
    }
    public static LandmarkToVec3(landMark: NormalizedLandmark): Vector3 {
        return new Vector3(
            landMark.x,
            landMark.y,
            landMark.z
        )
    }

    public drawLine(points: Array<Vector3>) {
        const line = new Line()
        line.set(points)
        line.render(this.scene)
        this.lines.push(new Line())
    }
}