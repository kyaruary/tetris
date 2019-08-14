import { types } from "util";
import { Square } from "./Square";

export interface Point {
    readonly x: number;
    readonly y: number;
}

export interface IViewer {
    show(): void;
    remove(): void;
}

export type SquareShape = Point[];