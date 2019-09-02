import { Point, Shape } from "./interface/types";
import { IViewer } from "../Viewer/interface/type";
import { Square } from "./Square";

/**
 *  方块类 -- 小块组成的俄罗斯方块
 *  
*/

export class Tetris {
    private _squareGroup: Square[] = [];
    constructor(private _shape: Shape, private _centerPoint: Point, private _color: string) {
        this._shape.forEach(p => {
            this._squareGroup.push(new Square({
                x: p[0] + this._centerPoint.x,
                y: p[1] + this._centerPoint.y
            }, this._color))
        });
    }

    public get centerPoint() {
        return this._centerPoint;
    }

    public get shape() {
        return this._shape;
    }
    public set shape(value) {
        this._shape = value;
        this._squareGroup.forEach((sq, index) => {
            sq.point = {
                x: this._shape[index][0] + this.centerPoint.x,
                y: this._shape[index][1] + this.centerPoint.y,
            }
        })
    }

    public set centerPoint(value) {
        this._centerPoint = value;
        this._squareGroup.forEach((sq, index) => {
            sq.point = {
                x: this._shape[index][0] + this.centerPoint.x,
                y: this._shape[index][1] + this.centerPoint.y,
            }
        })
    }

    public get squareGroup() {
        return this._squareGroup;
    }
    public get color() {
        return this._color;
    }
}