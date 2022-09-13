import { Vector3 } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as Core from './core'
import Point from './point'
import { NormalizedLandmarkList } from '@mediapipe/pose'
import Line from './line'
export default class Graphic {
    private scene:Core.Scene
    private camera:Core.Camera
    private renderer:Core.Renderer
    private light:Core.Light
    private control:OrbitControls
    private parent: HTMLElement

    private link: Array<boneInfo> = new Array()

    private points: Array<Point> = new Array()
    private lines: Array<Line> = new Array()
    constructor (
        parent: HTMLElement,
        link: Array<boneInfo>
    ) {
        this.parent = parent
        this.link = link
        this.scene = new Core.Scene()
        this.camera = new Core.Camera(95, this.parent.clientWidth / this.parent.clientHeight)
        this.renderer = new Core.Renderer(this.parent.clientWidth, this.parent.clientHeight, this.parent)
        this.control = new OrbitControls(this.camera, this.renderer.domElement)
        this.light = new Core.Light()
        this.light.addLight(this.scene)

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
                new Vector3(
                    positions[element.parent].x * 100, positions[element.parent].y * 100, positions[element.parent].z * 100
                ),
                new Vector3(
                    positions[element.child].x * 100, positions[element.child].y * 100, positions[element.child].z * 100
                )
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
                new Vector3(positions[idx].x * 100, positions[idx].y * 100, positions[idx].z * 100),
                color
            )
        })
    }
    public update() {
        this.render()
    }
    private render() {
        this.renderer.render(this.scene, this.camera)
    }
}

export interface boneInfo {
    name: string
    parent: number
    child: number
}