import { Square } from "../Logic/Square";
import $ from 'jquery';
import { PageConfig } from "../../config/page.config";
import { IViewer } from "./interface/type";
import { TetrisConfig } from "../../config/tetris.config";

export class SquarePageViewer implements IViewer {
    private dom?: JQuery<HTMLElement>;
    constructor(private sq: Square, private container: JQuery<HTMLElement>) {
        this.container.css({
            height: PageConfig.height * TetrisConfig.height,
            width: PageConfig.width * TetrisConfig.width
        })
    }
    show(): void {
        if (!this.dom) {
            this.dom = $('<div>').css({
                ...PageConfig
            }).appendTo(this.container);
        }
        this.dom.css({
            top: this.sq.point.y * PageConfig.height,
            left: this.sq.point.x * PageConfig.width,
            backgroundColor: this.sq.color
        })
    };
    remove(): void {
        this.dom = undefined;
    }
}