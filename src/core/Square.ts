import { Point, IViewer } from "./types";

export class Square {
    private _viewer?: IViewer;
    constructor(private _point: Point, private _color: string) { }
    public get point(): Point {
        return this._point;
    }
    public set point(value) {
        this._point = value;
        if (this._viewer) {
            this._viewer.show();
        }
    }
    public get color() {
        return this._color;
    }
    public set color(value) {
        this._color = value;
    }
    public get view() {
        return this._viewer;
    }
    public set view(value) {
        this._viewer = value;
    }
}