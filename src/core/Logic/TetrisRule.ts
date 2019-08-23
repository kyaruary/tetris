import { TetrisConfig } from "../config/tetris.config";
import { Point, Shape } from "./interface/types";
import { Tetris } from "./Tetris";
import { Square } from "./Square";

export class TetrisRule {

    // 控制俄罗斯方块移动
    // 控制俄罗斯方块旋转
    // 边界触碰检测
    // 检测俄罗斯方块是否可以移动
    public static canIMove(shape: Shape, target: Point, exist: Square[]): boolean {
        let [borderJudgement, squareJudgement] = [true, true];
        const newTetrisPoint: Point[] = shape.map(s => {
            return {
                x: s[0] + target.x,
                y: s[1] + target.y
            }
        })
        /**
         * 若任意一个方块移动以后的坐标超过边界则返回false
         * Array.prototype.some 只要有一个满足条件便返回true
         * 但是返回true意味着移动成功 所以对结果取反
         */
        borderJudgement = newTetrisPoint.some(p => (p.x < 0 || p.x > TetrisConfig.width - 1 || p.y < 0 || p.y > TetrisConfig.height - 1));
        // 判断方块是否与已经存在的方块有触碰
        squareJudgement = exist ? newTetrisPoint.some(p => exist.some(e => (e.point.x === p.x && e.point.y === p.y))) : true;
        return !borderJudgement && !squareJudgement;
    }


    /**
     * 将方块移动到指定的位置（经过边界判断以后）
     * @param  {Tetris} tetris
     * @param  {Point} target
     * @param  {Square[]} exist
     * @returns boolean
     */
    public static move(tetris: Tetris, target: Point, exist: Square[]): boolean {
        let success = true;
        TetrisRule.canIMove(tetris.shape, target, exist) ? tetris.centerPoint = target : success = false;
        return success;
    }
    /**
     * 旋转方块
     * 将每个小块做矩阵运算 顺时针旋转90°
     *            [ 0   1 ]
     * [x, y]  *  |       |
     *            [ 1   0 ]
     * 即 x' = x * 0 + y * 1
     *    y' = x * 1 + y * 0
     * @param tetris 
     * @param isClock 
     */
    public static rotate(tetris: Tetris, isClock: boolean, exist: Square[]) {
        const angle = isClock ? 1 : -1;
        let new_shape: Shape = tetris.shape.map(s => {
            const x = s[0], y = s[1];
            return [x * 0 - y * angle, x * angle + y * 0]
        });
        // 判断旋转之后是否可以移动
        tetris.shape = new_shape;
    }
}