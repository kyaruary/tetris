import { Point, Shape } from "./interface/types";
import { Tetris } from "./Tetris";
import { Square } from "./Square";

export class TetrisRule {
    /**
     * 检测方块是否可以移动 可以-->true 不可以-->false
     * @param  {Shape} shape
     * @param  {Point} target
     * @param  {Square[]} exist
     * @param  {number} width
     * @param  {number} height
     * @returns boolean
     */
    public static canIMove(shape: Shape, target: Point, exist: Square[], width: number, height: number): boolean {
        let [borderJudgement, squareJudgement] = [true, true];
        const newTetrisPoint: Point[] = shape.map(s => {
            return {
                x: s[0] + target.x,
                y: s[1] + target.y
            }
        })
        /**
         * 目的：若任意一个方块移动以后的坐标超过边界则返回false
         * Array.prototype.some 只要有一个满足条件便返回true
         * 但是返回true意味着移动成功 所以对结果取反
         */
        borderJudgement = !newTetrisPoint.some(p => (p.x < 0 || p.x > width - 1 || p.y > height - 1));
        // 同理判断方块是否与已经存在的方块有触碰
        squareJudgement = exist ? !newTetrisPoint.some(p => exist.some(e => (e.point.x === p.x && e.point.y === p.y))) : true;
        return borderJudgement && squareJudgement;
    }


    /**
     * 将方块移动到指定的位置（不经过经过边界判断）
     * @param  {Tetris} tetris
     * @param  {Point} target
     * @param  {Square[]} exist
     * @param  {number} width
     * @param  {number} height
     * @returns boolean
     */
    public static move(tetris: Tetris, target: Point): void {
        tetris.centerPoint = target;
    }

    /**
     * 旋转方块 返回旋转后的形状
     * 将每个小块做矩阵运算 顺时针旋转90°
     *            [ 0   1 ]
     * [x, y]  *  |       |
     *            [ 1   0 ]
     * 即 x' = x * 0 + y * 1
     *    y' = x * 1 + y * 0
     * @param  {Tetris} tetris
     * @param  {boolean} isClock
     * @param  {Square[]} exist
     * @param  {number} width
     * @param  {number} height
     * @returns boolean
     */
    public static nextRotateShape(tetris: Tetris, isClock: boolean): Shape {
        const angle = isClock ? 1 : -1;
        const new_shape: Shape = tetris.shape.map(s => {
            const x = s[0], y = s[1];
            return [x * 0 - y * angle, x * angle + y * 0];
        });
        return new_shape;
    }

    public static changeShape(tetris: Tetris, newshape: Shape): void {
        tetris.shape = newshape;
    }

    public static eliminateLine(exist: Square[], y: number): Square[] {
        const after = exist.filter(e => e.point.y !== y);
        const deleteArr = exist.filter(e => e.point.y === y);
        deleteArr.forEach(d => d.viewer.remove());
        after.forEach(a => {
            if (a.point.y < y) {
                a.point = {
                    x: a.point.x,
                    y: a.point.y + 1,
                }
            }
            a.viewer.show();
        })
        return after;
    }
    public static canEliminate(exist: Square[], width: number): number[] {
        const ys = exist.map(e => e.point.y);
        const arr = [];
        const max = Math.max(...ys);
        const min = Math.min(...ys);
        for (let i = min; i <= max; i++) {
            const length = this.getLineSquares(exist, i);
            if (length === width) {
                arr.push(i);
            }
        }
        return arr;
    }

    public static getLineSquares(exist: Square[], y: number): number {
        return exist.filter(e => e.point.y === y).length;
    }

    public static eliminateLines(exist: Square[], x: number[]): Square[] {
        let after = exist;
        const waitForDelete = [...x];
        const len = waitForDelete.length;
        if (len === 0) {
            return after;
        } else if (len === 1) {
            return this.eliminateLine(exist, waitForDelete[0]);
        } else {
            let f = waitForDelete.shift();
            return this.eliminateLines(this.eliminateLine(after, f), waitForDelete);
        }
    }
}