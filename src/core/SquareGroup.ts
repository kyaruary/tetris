import { Square } from "./Square";
import { SquareShape, Point } from "./types";

export class SquareGroup {
    private readonly _squares: Square[];
    constructor(
        private _shape: SquareShape,
        private _centerPoint: Point,
        private _color: string
    ) {
        const arr: Square[] = [];
        _shape.forEach(s => {
            arr.push(new Square({
                x: this._centerPoint.x + s.x,
                y: this._centerPoint.y + s.y
            }, this._color))
        })
        this._squares = arr;
    }
    public get shape() {
        return this._shape;
    }
    public set shape(value) {
        this._shape = value;
    }
    public get centerPoint() {
        return this._centerPoint;
    }
    public set centerPoint(value) {
        this._centerPoint = value;
        this._shape.forEach((shape, i) => {
            this._squares[i].point = {
                x: shape.x + this._centerPoint.x,
                y: shape.y + this._centerPoint.y
            }
        })
    }
    public get squares() {
        return this._squares;
    }
}