import { IViewer } from "./types";
import { Square } from "./Square";

export class Viewer implements IViewer {
    constructor(private square: Square) { }
    show(): void {
        console.log(this.square.point, this.square.color);
    };
    remove(): void {
        this.square.color = "";
        this.square.point = {
            x: 0,
            y: 0
        };
    }
}