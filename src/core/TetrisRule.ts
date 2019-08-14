import { Point } from "./types";
import { Square } from "./Square";

declare function move(tagert: Point): boolean;
declare function move(tagert: Square): string;

export class TetrisRule {
    static move(){}
}