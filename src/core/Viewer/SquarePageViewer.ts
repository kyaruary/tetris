import { Square } from "../Logic/Square";
import $ from 'jquery';
import { PageConfig } from "../../config/page.config";
import { IViewer } from "./interface/type";
export class SquarePageViewer implements IViewer {
    private dom?: JQuery<HTMLElement>;
    private squareConfig = PageConfig.squareConfig;
    constructor(private sq: Square, private container: JQuery<HTMLElement>) { }
    show(): void {
        if (!this.dom) {
            this.dom = $('<div>').css({
                ...this.squareConfig
            }).appendTo(this.container);
        }
        this.dom.css({
            top: this.sq.point.y * this.squareConfig.height,
            left: this.sq.point.x * this.squareConfig.width,
            backgroundColor: this.sq.color
        })
    };
    remove(): void {
        this.dom.remove();
    }
}