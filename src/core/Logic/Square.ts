import { Point } from "./interface/types";
import { IViewer } from "../Viewer/interface/type";
/**
 * 小块类
 */
export class Square {
    private _viewer?: IViewer;
    constructor(private _point: Point, private _color: string) { }
    public get point(): Point {
        return this._point;
    }
    public set point(value) {
        this._point = value;
        this._viewer ? this._viewer.show() : false;
    }
    public get color() {
        return this._color;
    }
    public set color(value) {
        this._color = value;
    }
    public get viewer() {
        return this._viewer;
    }
    public set viewer(value) {
        this._viewer = value;
    }
}