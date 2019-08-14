import { Square } from "./core/Square";
import { SquarePageViewer } from "./core/Viewer/SquarePageViewer";
import $ from 'jquery';
import { SquareShape } from "./core/types";
import { SquareGroup } from "./core/SquareGroup";

const shape1: SquareShape = [{
    x: 0,
    y: -2
}, {
    x: 0,
    y: -1
}, {
    x: 0,
    y: 0
}, {
    x: 1,
    y: 0
}]

const sg = new SquareGroup(shape1, { x: 3, y: 4 }, "red");
sg.squares.forEach(square => {
    square.view = new SquarePageViewer(square, $('#app'));
})

sg.centerPoint = {
    x: 4,
    y: 5
}
