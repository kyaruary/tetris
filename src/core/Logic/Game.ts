import { Point, GameStatus } from "./interface/types";
import { Utils } from "../utils";
import { TetrisShape, TetrisColors, TetrisConfig } from "../config/tetris.config";
import { Tetris } from "./Tetris";
import { IGameViewer } from "../Viewer/interface/type";
import { TetrisRule } from "./TetrisRule";
import { Square } from "./Square";

/**
 * 游戏生命周期
 * 游戏状态
 * 游戏操作
 */

export class Game {
    private _mainCenterPoint: Point = { x: TetrisConfig.width / 2 - 1, y: 0 };
    private _tipCenterPoint: Point = { x: TetrisConfig.width / 2 - 1, y: 0 };
    private _currentTetris: Tetris = new Tetris(Utils.getRandomMember(TetrisShape), this._mainCenterPoint, Utils.getRandomMember(TetrisColors));
    private _nextTetris: Tetris = new Tetris(Utils.getRandomMember(TetrisShape), this._tipCenterPoint, Utils.getRandomMember(TetrisColors));
    private _gameStatus: GameStatus = GameStatus.init;
    private _squares: Square[] = [];
    private _duration?: number = TetrisConfig.levels.easy.duration;
    private _score: number = 0;
    private _exist: Square[] = [];
    private _timer?: number;
    constructor(private _viewer: IGameViewer) {
        this._viewer.init(this);
        this._gameStatus = GameStatus.playing;
        this.autoDrop();
    }

    // 游戏开始
    start() {

    }
    // 随机生成下一个俄罗斯方块 
    generateNextTetris(centerPoint: Point) {
        const shape = Utils.getRandomMember(TetrisShape);
        const color = Utils.getRandomMember(TetrisColors);
        this._nextTetris = new Tetris(shape, { x: TetrisConfig.width / 2 - 1, y: 0 }, color);
        this._nextTetris = new Tetris(shape, centerPoint, color);
        // this._viewer.showNextTetris(this._currentTetris);
    }
    // 将等待方块切换到游戏区

    // 上下左右功能
    right1(): boolean {
        const target: Point = {
            x: this._currentTetris.centerPoint.x + 1,
            y: this._currentTetris.centerPoint.y
        }
        return this.move(this._currentTetris, target, this._exist);
    }

    left1(): boolean {
        const target: Point = {
            x: this._currentTetris.centerPoint.x - 1,
            y: this._currentTetris.centerPoint.y
        }
        return this.move(this._currentTetris, target, this._exist);
    }

    drop1(): boolean {
        const target: Point = {
            x: this._currentTetris.centerPoint.x,
            y: this._currentTetris.centerPoint.y + 1
        }
        return this.move(this._currentTetris, target, this._exist);
    }

    fallDown() {
        while (this.drop1()) { }
    }

    rotate() {
        if (!this._currentTetris) {
            return false;
        }
        TetrisRule.rotate(this._currentTetris, TetrisConfig.isClock, this._exist);
        return true;
    }
    private move(tetris: Tetris, target: Point, exist: Square[]): boolean {
        return (!tetris || this._gameStatus !== GameStatus.playing) ? false : TetrisRule.move(tetris, target, exist);
    }

    autoDrop() {
        this._timer = setInterval(() => {
            this.drop1();
        }, this._duration);
    }

    public get currentTetris() {
        return this._currentTetris;
    }
}