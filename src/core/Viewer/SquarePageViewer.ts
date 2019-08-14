import { IViewer } from "../types";
import { Square } from "../Square";
import $ from 'jquery';
import PageConfig from "./PageConfig";
export class SquarePageViewer implements IViewer {
    private dom?: JQuery<HTMLElement>;
    constructor(private sq: Square, private container: JQuery<HTMLElement>) { }
    show(): void {
        if (!this.dom) {
            this.dom = $('<div>').css({
                position: PageConfig.position,
                height: PageConfig.SquareHeight,
                width: PageConfig.SquareWidth,
                boxSizing: PageConfig.boxSizing,
                border: PageConfig.border
            }).appendTo(this.container);
        }
        this.dom.css({
            top: this.sq.point.y * PageConfig.SquareHeight,
            left: this.sq.point.x * PageConfig.SquareWidth,
            backgroundColor: this.sq.color
        })
    };
    remove(): void {
        // throw new Error("Method not implemented.");
    }
}